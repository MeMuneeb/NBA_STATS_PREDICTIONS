import pandas as pd
import requests
import json
from pymongo import MongoClient, UpdateOne
import os
import dotenv
from dotenv import load_dotenv
load_dotenv("../.env")


headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9', 'Referer': 'https://www.nba.com/',}
url = "https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2023-24&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision="
response = requests.get(url, headers=headers)
data=response.json()

# Extract the relevant part of the data
team_stats = data['resultSets'][0]['rowSet'] 
headers = data['resultSets'][0]['headers']

# Find the indices for the columns we're interested in
indices = {
    "team_id": headers.index('TEAM_ID'),
    "team_name": headers.index('TEAM_NAME'),
    "w_pct": headers.index('W_PCT'),
    "fg_pct": headers.index('FG_PCT'),
    "reb": headers.index('REB'),
    "ast": headers.index('AST'),
    "tov": headers.index('TOV'),
    "stl": headers.index('STL'),
    "blk": headers.index('BLK'),
    "plus_minus": headers.index('PLUS_MINUS')
}

# Filter and reformat the data to only include the fields we're interested in
filtered_data = [
    {
        "team_id": team_stats_row[indices["team_id"]],
        "team_name": team_stats_row[indices["team_name"]],
        "w_pct": round(team_stats_row[indices["w_pct"]]*100,1),
        "fg_pct": round(team_stats_row[indices["fg_pct"]]*100,1),
        "reb": team_stats_row[indices["reb"]],
        "ast": team_stats_row[indices["ast"]],
        "tov": team_stats_row[indices["tov"]],
        "stl": team_stats_row[indices["stl"]],
        "blk": team_stats_row[indices["blk"]],
        "plus_minus": team_stats_row[indices["plus_minus"]]
    }
    for team_stats_row in team_stats
]

# Now, `filtered_data` contains only the data fields we're interested in

# Connect to MongoDB 
client = MongoClient(os.environ.get('MONGO_URI'))
db = client['stats']  # Replace with your database name
collection = db['teams']  # Replace with your collection name

# # Insert processed data into MongoDB
# collection.insert_many(filtered_data)
bulk_operations = []

for team_data in filtered_data:
    # Create an UpdateOne operation for each team with upsert=True
    # This will update the document if it exists, or insert it if it does not
    operation = UpdateOne(
        {'team_id': team_data['team_id']},  # Match document by unique team_id
        {'$set': team_data},  # Set new data
        upsert=True  # Perform an insert if the document does not exist
    )
    bulk_operations.append(operation)

# Perform all the bulk operations
if bulk_operations:
    collection.bulk_write(bulk_operations)


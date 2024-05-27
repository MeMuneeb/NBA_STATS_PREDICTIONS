import pandas as pd
import requests
import json
from pymongo import MongoClient, UpdateOne
import os
import dotenv
from dotenv import load_dotenv
load_dotenv("../.env")

headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'Referer': 'https://www.nba.com/',}
url="https://stats.nba.com/stats/leaguestandingsv3?GroupBy=conf&LeagueID=00&Season=2023-24&SeasonType=Regular%20Season&Section=overall"
response = requests.get(url, headers=headers)
data=response.json()

# Extract the relevant part of the data for leaderboard
standings = data['resultSets'][0]['rowSet'] 
headers = data['resultSets'][0]['headers']

# Find the indices for the columns we're interested in
indices = {
    "team_id": headers.index('TeamID'),
    "team_name": headers.index('TeamName'),
    "conference": headers.index('Conference'),
    "w_pct": headers.index('WinPCT'),
    "gb": headers.index('ConferenceGamesBack'),
    "conf": headers.index('ConferenceRecord'),
    "home": headers.index('HOME'),
    "road": headers.index('ROAD'),
    "last10": headers.index('L10'),
}

# Filter and reformat the data to only include the fields we're interested in
filtered_data = [
    {
        "team_id": standings_row[indices["team_id"]],
        "team_name": standings_row[indices["team_name"]],
        "conference": standings_row[indices["conference"]],
        "w_pct": round(standings_row[indices["w_pct"]]*100,1),
        "gb": standings_row[indices["gb"]],
        "conf": standings_row[indices["conf"]],
        "home": standings_row[indices["home"]],
        "road": standings_row[indices["road"]],
        "last10": standings_row[indices["last10"]]
    }
    for standings_row in standings
]

# Now, `filtered_data` contains only the data fields we're interested in

# Connect to MongoDB 
client = MongoClient(os.environ.get('MONGO_URI'))
db = client['stats']  # Replace with your database name
collection = db['standings']  # Replace with your collection name

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
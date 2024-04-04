import sys
import joblib
import pandas as pd
from pymongo import MongoClient
import os
import dotenv
from dotenv import load_dotenv
load_dotenv()

# Function to fetch team stats by ID
def fetch_team_stats(team_id, client):
    db = client['stats']  # Use your actual database name
    teams_data = list(db['teams'].find())
    players_data = list(db['players'].find())

    # Convert to DataFrames for easier manipulation
    teams_df = pd.DataFrame(teams_data)
    players_df = pd.DataFrame(players_data)

    # Aggregate points for each team
    team_points = players_df.groupby('team_id')['pts'].sum().reset_index() # Merge this with team data

    team_stats_enriched = pd.merge(teams_df, team_points, on='team_id', how='left')

    team_stats = team_stats_enriched.loc[team_stats_enriched['team_id'] == team_id].iloc[0]

    return team_stats

# Function to calculate differential stats for the matchup
def calculate_differential_stats(team1_stats, team2_stats):
    differential_stats = {
        'pts_diff': team1_stats['pts'] - team2_stats['pts'],
        'ast_diff': team1_stats['ast'] - team2_stats['ast'],
        'blk_diff': team1_stats['blk'] - team2_stats['blk'],
        'fg_pct_diff': team1_stats['fg_pct'] - team2_stats['fg_pct'],
        'plus_minus_diff': team1_stats['plus_minus'] - team2_stats['plus_minus'],
        'reb_diff': team1_stats['reb'] - team2_stats['reb'],
        'stl_diff': team1_stats['stl'] - team2_stats['stl'],
        'tov_diff': team1_stats['tov'] - team2_stats['tov'],
        
    }
    return pd.DataFrame([differential_stats])

def make_prediction(team1_id, team2_id):
    # MongoDB connection
    client = MongoClient(os.environ.get('MONGO_URI'))
    
    # Fetch team stats
    team1_stats = fetch_team_stats(team1_id, client)
    team2_stats = fetch_team_stats(team2_id, client)
    
    # Calculate differential stats
    input_features = calculate_differential_stats(team1_stats, team2_stats)

    # Load the machine learning models
    model_class = joblib.load('/Users/Muneeb1/Desktop/NBA_Stats/ml_model/nba_class_model.joblib')
    model_regr = joblib.load('/Users/Muneeb1/Desktop/NBA_Stats/ml_model/nba_regr_model.joblib')

    # Make predictions
    prediction_class = model_class.predict(input_features)
    prediction_regr = model_regr.predict(input_features)    
    
    # Close the MongoDB connection
    client.close()
    
    # Print the prediction results
    if prediction_class == 1:
        print(f"{team1_stats['team_name']} is predicted to win.")
    else:
        print(f"{team2_stats['team_name']} is predicted to win.")

    if int(abs(prediction_regr[0])) == 0:
        print("The predicted score difference is 1")
    else:
        print(f"The predicted score difference is: {int(abs(prediction_regr[0]))}")

if __name__ == "__main__":
    team1_id = int(sys.argv[1])  
    team2_id = int(sys.argv[2])
    make_prediction(team1_id, team2_id)

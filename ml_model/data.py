import pandas as pd
import requests
import json


headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9', 'Referer': 'https://www.nba.com/',}
url = "https://stats.nba.com/stats/leaguegamelog?Counter=1000&DateFrom=&DateTo=&Direction=DESC&ISTRound=&LeagueID=00&PlayerOrTeam=T&Season=2023-24&SeasonType=Regular%20Season&Sorter=DATE"
response = requests.get(url, headers=headers)
data=response.json()

games_data = data['resultSets'][0]['rowSet']
headers = data['resultSets'][0]['headers']

# Create DataFrame
games_df = pd.DataFrame(games_data, columns=headers)

def process_game(group):
    # Initialize a dictionary to hold the processed game data
    game_data = {}
    
    # Loop through the group rows and identify home and away teams
    for _, row in group.iterrows():
        if "@" in row['MATCHUP']:
            away_team_row = row
        else:
            home_team_row = row
    
    # Compute differential statistics
    game_data['home_team_id'] = home_team_row['TEAM_ID']
    game_data['home_team_name'] = home_team_row['TEAM_NAME']
    game_data['away_team_id'] = away_team_row['TEAM_ID']
    game_data['away_team_name'] = away_team_row['TEAM_NAME']
    game_data['pts_diff'] = home_team_row['PTS'] - away_team_row['PTS']
    game_data['ast_diff'] = home_team_row['AST'] - away_team_row['AST']
    game_data['blk_diff'] = home_team_row['BLK'] - away_team_row['BLK']
    game_data['fg_pct_diff'] = home_team_row['FG_PCT'] - away_team_row['FG_PCT']
    game_data['plus_minus_diff'] = home_team_row['PLUS_MINUS'] - away_team_row['PLUS_MINUS']
    game_data['reb_diff'] = home_team_row['REB'] - away_team_row['REB']
    game_data['stl_diff'] = home_team_row['STL'] - away_team_row['STL']
    game_data['tov_diff'] = home_team_row['TOV'] - away_team_row['TOV']
    
    # Determine the game outcome
    game_data['home_win'] = 1 if home_team_row['WL'] == 'W' else 0
    
    return pd.Series(game_data)

# Group by GAME_ID and process each game
processed_games = games_df.groupby('GAME_ID').apply(process_game).reset_index()

processed_games.to_csv('nba_games.csv', index=False)
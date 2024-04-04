import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, mean_squared_error
import numpy as np
import joblib

# Load the matchups data
games_df = pd.read_csv('nba_games.csv')
features_df = games_df.drop(['GAME_ID'], axis=1)

X = features_df.drop(['home_win', 'home_team_id', 'away_team_id', 'home_team_name', 'away_team_name'], axis=1)
# For classification
y_class = features_df['home_win']

# For regression
y_regr = features_df['pts_diff']

X_train_class, X_test_class, y_train_class, y_test_class = train_test_split(X, y_class, test_size=0.2, random_state=42)

X_train_regr, X_test_regr, y_train_regr, y_test_regr = train_test_split(X, y_regr, test_size=0.2, random_state=42)

# Classification Model
model_class = RandomForestClassifier(random_state=42)
model_class.fit(X_train_class, y_train_class)
predictions_class = model_class.predict(X_test_class)
accuracy = accuracy_score(y_test_class, predictions_class)
print(f"Classification Accuracy: {accuracy}")

# Regression Model
model_regr = RandomForestRegressor(random_state=42)
model_regr.fit(X_train_regr, y_train_regr)
predictions_regr = model_regr.predict(X_test_regr)
mse = mean_squared_error(y_test_regr, predictions_regr)
rmse = np.sqrt(mse)
print(f"Regression RMSE: {rmse}")

joblib.dump(model_class, 'nba_class_model.joblib')
joblib.dump(model_regr, 'nba_regr_model.joblib')
from dotenv import load_dotenv   #for python-dotenv method
load_dotenv()                    #for python-dotenv method

import os 

MONGO_URI = os.environ.get('MONGO_URI')

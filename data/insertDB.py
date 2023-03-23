import csv,os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

serverdbname=os.getenv('SERVER_DB_NAME')
serverdbpwd=os.environ.get('SERVER_DB_PWD')
clientdbname=os.environ.get('CLIENT_DB_NAME')
clientdbpwd=os.environ.get('CLIENT_DB_PWD')

# MongoDB connection details
client = MongoClient('mongodb://localhost:27017/')
server_DB = serverdbname+':'+serverdbpwd
client_DB = clientdbname+ ':'+ clientdbpwd
print(server_DB,client_DB)
db1 = client[server_DB]
collection1 = db1['youtubers']
db2 = client[client_DB]
collection2 = db2['youtubers']

# Open the CSV file and read each row as a dictionary
with open('db1.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        youtuberObj = {
        "Rank" : (row[0]),
	    "username" : row[1],
	    "Youtube Url" : row[2],
	    "Name" : row[3],
	    "Category" : row[4],
	    "Subscribers" : row[5],
	    "Audience Country" : row[6],
	   
        }

        collection1.insert_one(youtuberObj)
print("DB1 Created")

with open('db2.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        youtuberObj = {
        "Rank" : (row[0]),
	    "username" : row[1],
	    "Youtube Url" : row[2],
	    "Name" : row[3],
	    "Category" : row[4],
	    "Subscribers" : row[5],
	    "Audience Country" : row[6],
	    
        }

        collection2.insert_one(youtuberObj)
print("DB2 Created")

# Inserts the Rank as a string, used the following command to convert it into integer: db.youtubers.update({},[{"$set": {"Rank": {"$toInt": "$Rank"}}}],{"multi" : true})
# db.youtubers.updateMany({ },{ $unset: { edad: "" } } )
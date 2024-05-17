from pymongo import MongoClient
import json

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/appbg-user')
db = client['appbg-user']  
collection = db['plates']  

# Read the JSON file
json_file_path = r'C:\_script\_json\result_plate.json'
with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

# Insert data into MongoDB
result = collection.insert_many(data['plates'])
print(f"Data inserted with record ids {result.inserted_ids}")

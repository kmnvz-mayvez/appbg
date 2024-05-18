import pymongo
import csv

# koneksi ke monggodb
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["appbg-user"]
collection = db["plates"]

# save json file
data = collection.find()
with open('C:\\_script\\_csv\\data-plates.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["_id", "plate", "source"])
    for d in data:
        writer.writerow([d["_id"], d["plate"], d["source"]])

print("data-plates.csv")

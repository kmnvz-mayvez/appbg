import pymongo
import csv

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["appbg-user"]
collection = db["User"]

data = collection.find()
with open('data_user.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["_id", "username", "email", "profilePicture", "hourStay", "cost", "plateNumber", "phoneNumber", "createdAt"])
    for d in data:
        writer.writerow([d["_id"], d["username"], d["email"], d["profilePicture"], d["hourStay"], d["cost"], d["plateNumber"], d["phoneNumber"], d["createdAt"]])

print("data-user.csv")

import pandas as pd
from pymongo import MongoClient

# membaca file CSV ke dalam DataFrame
combined_path = r'\_script\_csv\combined-plate.csv'
df_combined = pd.read_csv(combined_path)

# membuat koneksi ke MongoDB
client = MongoClient('mongodb://localhost:27017/appbg-user')
db = client['appbg-user']  
collection = db['Combinedplates']  

# mengubah DataFrame menjadi list of dictionaries (records) untuk dimasukkan ke MongoDB
data = df_combined.to_dict(orient='records')

# memasukkan data ke MongoDB
collection.insert_many(data)

# menampilkan pesan berhasil
print("Data berhasil dimasukkan ke MongoDB.")

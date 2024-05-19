import pandas as pd
import json
import re

# membaca data dari file CSV
file_path= r'\_script\\_csv\\data-plates.csv'
df = pd.read_csv(file_path)

# fungsi untuk mendapatkan digit terakhir jika itu angka
def get_last_digit(plate):
    if isinstance(plate, str):
        digits = re.findall(r'\d', plate)
        if digits:
            return int(digits[-1])
    return None

# menambah kolom baru untuk menyimpan keterangan "odd" atau "even"
df['last_digit'] = df['plate'].apply(get_last_digit)
df['type'] = df['last_digit'].apply(lambda x: 'odd' if x is not None and x % 2 != 0 else 'even' if x is not None else None)

# memisahkan data menjadi ganjil dan genap, mengabaikan baris dengan None di 'last_digit'
odd_df = df[df['type'] == 'odd']
even_df = df[df['type'] == 'even']

# mengubah DataFrame menjadi list of dictionaries dengan penambahan ID
odd_data = odd_df.reset_index().rename(columns={'index': 'id'}).to_dict(orient='records')
for item in odd_data:
    item['id'] += 1

even_data = even_df.reset_index().rename(columns={'index': 'id'}).to_dict(orient='records')
for item in even_data:
    item['id'] += 1

# menyimpan data ke file JSON dengan format yang diinginkan
odd_json_path = r'\_script\_json\odd_plate.json'
even_json_path = r'\_script\_json\even_plate.json'
with open(odd_json_path, 'w') as odd_file:
    json.dump({'plates': odd_data}, odd_file, indent=4)

with open(even_json_path, 'w') as even_file:
    json.dump({'plates': even_data}, even_file, indent=4)

print(f"Data telah disimpan ke dalam file '{odd_json_path}' dan '{even_json_path}'")

import pandas as pd
import json

# membaca data dari file CSV
file_path = r'\\_script\\_csv\\data-plates.csv'
df = pd.read_csv(file_path)

# fungsi untuk mendapatkan digit terakhir jika itu angka
def get_last_digit(plate):
    last_char = plate[-1]
    return int(last_char) if last_char.isdigit() else None

# Menambah kolom baru untuk angka terakhir dari plat
df['last_digit'] = df['plate'].apply(get_last_digit)

# Menambah kolom baru untuk menyimpan keterangan "odd" atau "even"
df['type'] = df['last_digit'].apply(lambda x: 'odd' if x % 2 != 0 else 'even' if x is not None else None)

# Memisahkan data menjadi ganjil dan genap, mengabaikan baris dengan None di 'last_digit'
odd_df = df[df['type'] == 'odd']
even_df = df[df['type'] == 'even']

# Mengubah DataFrame menjadi list of dictionaries dengan penambahan ID
odd_data = odd_df.reset_index().rename(columns={'index': 'id'}).to_dict(orient='records')
for item in odd_data:
    item['id'] += 1

even_data = even_df.reset_index().rename(columns={'index': 'id'}).to_dict(orient='records')
for item in even_data:
    item['id'] += 1

# Menyimpan data ke file JSON dengan format yang diinginkan
with open(r'\\_script\\_json\\odd_plate.json', 'w') as odd_file:
    json.dump({'plates': odd_data}, odd_file, indent=4)

with open(r'\\_script\\_json\\even_plate.json', 'w') as even_file:
    json.dump({'plates': even_data}, even_file, indent=4)

print("Data telah disimpan ke dalam file 'odd_plate.json' dan 'even_plate.json'")

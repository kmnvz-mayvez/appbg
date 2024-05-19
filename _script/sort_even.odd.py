import pandas as pd
import os
import re

# mendefinisikan path file CSV
file_path = r'\_script\_csv\data-plates.csv'
df = pd.read_csv(file_path)

# fungsi untuk mendapatkan digit terakhir jika itu angka
def get_last_digit(plate):
    if isinstance(plate, str):
        digits = re.findall(r'\d', plate)
        if digits:
            return int(digits[-1])
    return None

# menambah kolom baru untuk angka terakhir dari plat dan Menambah kolom "type" berdasarkan nilai dari "last_digit"
df['last_digit'] = df['plate'].apply(get_last_digit)
df['type'] = df['last_digit'].apply(lambda x: 'even' if x is not None and x % 2 == 0 else 'odd' if x is not None else None)

# memisahkan data menjadi ganjil dan genap, mengabaikan baris dengan None di 'last_digit'
odd_df = df[df['type'] == 'odd']
even_df = df[df['type'] == 'even']

# menyimpan data ke file CSV
odd_file_path = r'\_script\_csv\odd-plate.csv'
even_file_path = r'\_script\_csv\even-plate.csv'
odd_df.to_csv(odd_file_path, index=False)
even_df.to_csv(even_file_path, index=False)

print(f"Data telah disimpan ke dalam file '{odd_file_path}' dan '{even_file_path}'")

import pandas as pd

# membaca data dari file CSV
file_path = r'C:\\_script\\_csv\\data-plates.csv'
df = pd.read_csv(file_path)

# fungsi untuk mendapatkan digit terakhir jika itu angka
def get_last_digit(plate):
    last_char = plate[-1]
    return int(last_char) if last_char.isdigit() else None

# menambah kolom baru untuk angka terakhir dari plat
df['last_digit'] = df['plate'].apply(get_last_digit)

# menambah kolom "type" berdasarkan nilai dari "last_digit"
df['type'] = df['last_digit'].apply(lambda x: 'even' if x % 2 == 0 else 'odd' if x is not None else None)

# memisahkan data menjadi ganjil dan genap, mengabaikan baris dengan None di 'last_digit'
odd_df = df[df['type'] == 'odd']
even_df = df[df['type'] == 'even']

# menyimpan data ke file CSV
odd_df.to_csv(r'C:\\_script\\_csv\\odd_plate.csv', index=False)
even_df.to_csv(r'C:\\_script\\_csv\\even_plate.csv', index=False)

print("Data odd dan even telah disimpan'odd_plate.csv' dan 'even_plate.csv'")

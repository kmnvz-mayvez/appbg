import pandas as pd

# path file csv
even_path = r'\_script\_csv\even-plate.csv'
odd_path = r'\_script\_csv\odd-plate.csv'

# membaca file csv ke dalam DataFrame
df_even = pd.read_csv(even_path)
df_odd = pd.read_csv(odd_path)

# menggabungkan kedua DataFrame
df_combined = pd.concat([df_even, df_odd], ignore_index=True)

# menyimpan hasil penggabungan ke file CSV baru
combined_path = r'\_script\_csv\combined-plate.csv'
df_combined.to_csv(combined_path, index=False)

# menampilkan hasil
print("Data berhasil digabungkan dan disimpan di:", combined_path)

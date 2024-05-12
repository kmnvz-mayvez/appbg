import csv

file_path = r':\APPBG'
with open(file_path, 'r') as file:
    lines = file.readlines()

csv_file_path = r':\APPBG'
with open(csv_file_path, 'w', newline='') as csv_file:
    writer = csv.writer(csv_file)
    for line in lines:
        plate = line.strip()
        writer.writerow([plate])

print("File CSV created:", csv_file_path)
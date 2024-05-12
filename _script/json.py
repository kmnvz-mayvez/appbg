import json

file_path = r'C:\APPBG'
with open(file_path, 'r') as file:
    lines = file.readlines()
data = {'plates': []}
for idx, line in enumerate(lines, 1):
    plate = line.strip()
    data['plates'].append({'id': idx, 'plate': plate, 'source': 'motorcycle'})

json_file_path = r'C:\APPBG'
with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("File JSON create:", json_file_path)
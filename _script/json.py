import json

file_path = r'C:\APPBG'
with open(file_path, 'r') as file:
    lines = file.readlines()
data = {'plates': []}
for line in lines:
    plate = line.strip()
    data['plates'].append({'plate': plate, 'source': 'motorcycle'})

json_file_path = r'C:\APPBG'
with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("File JSON create:", json_file_path)
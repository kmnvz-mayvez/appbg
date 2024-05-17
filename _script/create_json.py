import json

# Path to the input file
file_path = r'C:\machine learning\plate-detection\result_plate.txt'
with open(file_path, 'r') as file:
    lines = file.readlines()

# Initialize a dictionary to hold the data
data = {'plates': []}
for idx, line in enumerate(lines, 1):
    plate = line.strip() 
    data['plates'].append({'id': idx, 'plate': plate, 'source': 'motorcycle'}) 
json_file_path = r'C:\_script\_json\result_plate.json'
with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("File JSON created:", json_file_path)

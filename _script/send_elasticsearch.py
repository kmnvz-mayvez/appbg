from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import json

# koneksi ke elasticsearch
es = Elasticsearch('http://elastic:@localhost:9200')
json_file_path = r'C:\_script\_json\result_plate.json'
with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

# membuat _index 
actions = [
    {
        "_index": "plates",
        "_id": item["id"],
        "_source": {
            "plate": item["plate"],
            "source": item["source"]
        }
    }
    for item in data["plates"]
]

# kirim data ke elasticsearch dengan bulk
success, _ = bulk(es, actions, index='plates', raise_on_error=True)
print(f"Transport to Elasticsearch: {success}")

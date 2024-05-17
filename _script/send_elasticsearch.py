from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import json

# Elasticsearch connection
es = Elasticsearch('http://elastic:@localhost:9200')
json_file_path = r'C:\_script\_json\result_plate.json'
with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

# Prepare the bulk actions
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

# Send the data to Elasticsearch using bulk
success, _ = bulk(es, actions, index='plates', raise_on_error=True)
print(f"Transport to Elasticsearch: {success}")

import json

from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk

json_file_path = r':\APPBG'
es = Elasticsearch('http://elastic:@localhost:9200')

with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)
actions = [
    {
        "_index": "plates",
        "_source": {
            "plate": item["plate"],
            "source": item["source"]
        }
    }
    for item in data["plates"]
]

success, _ = bulk(es, actions, index='_index', raise_on_error=True)
print(f"Data sucess transport to elastic: {success}")
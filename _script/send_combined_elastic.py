import pandas as pd
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk

# Baca file CSV menggunakan Pandas
csv_path = r'\_script\_csv\combined-plate.csv'
df = pd.read_csv(csv_path)

# Elasticsearch connection
es = Elasticsearch('http://elastic:@localhost:9200')

# Prepare the bulk actions
actions = [
    {
        "_index": "plates",
        "_id": str(row['_id']),
        "_source": {
            "plate": row['plate'],
            "source": row['source'],
            "last_digit": row['last_digit'],
            "type": row['type']
        }
    }
    for _, row in df.iterrows()
]

# Send the data to Elasticsearch using bulk
success, _ = bulk(es, actions, index='plates', raise_on_error=True)
print(f"Transport to Elasticsearch: {success}")

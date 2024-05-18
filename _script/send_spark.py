from pyspark.sql import SparkSession

# membuat spark session
spark = SparkSession.builder \
    .appName("Elasticsearch Integration") \
    .config("spark.jars.packages", "org.elasticsearch:elasticsearch-spark-30_2.12:8.0.0") \
    .config("spark.es.nodes", "localhost") \
    .config("spark.es.port", "9200") \
    .config("spark.es.net.http.auth.user", "") \
    .config("spark.es.net.http.auth.pass", "") \
    .config("spark.es.nodes.wan.only", "false") \
    .config("spark.driver.extraJavaOptions", "-Dlog4j.configuration=file:log4j.properties") \
    .config("spark.executor.extraJavaOptions", "-Dlog4j.configuration=file:log4j.properties") \
    .getOrCreate()

# membaca file csv 
df_user = spark.read.csv("file:///_script/_csv/data-user.csv", header=True, inferSchema=True)
df_plat = spark.read.csv("file:///_script/_csv/data-plates.csv", header=True, inferSchema=True)

# mengubah nama kolom
df_user = df_user.withColumnRenamed("_id", "id")
df_user = df_user.withColumnRenamed("plateNumber", "plate")
df_plat = df_plat.withColumnRenamed("_id", "id")

# menggabungkan dataframe
df_merge = df_user.join(df_plat, "plate")

# menyimpan dataframe ke elasticsearch
df_merge.write \
    .format("org.elasticsearch.spark.sql") \
    .option("es.resource", "merge/plates") \
    .mode("overwrite") \
    .save()
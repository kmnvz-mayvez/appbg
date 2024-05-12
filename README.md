# Creating parking app 
Creating a parking app with a microservices and big data approach involves designing a system composed of multiple services (microservices) that work together to efficiently manage parking data. This approach allows for greater scalability, flexibility, and the ability to handle large amounts of data common in parking applications. Using Apache Spark for large-scale data processing, MongoDB for flexible and structured data storage, and Elasticsearch for text search and analysis, the application can offer benefits such as improved scalability, reliability, and better analytical capabilities, ultimately enhancing user experience and parking management efficiency.

## Machine learing
* `Plate detection`
  * Import Libraries   : Importing necessary libraries like matplotlib, numpy, and tensorflow.
  * Create Dataset     : Using tf.keras.preprocessing.image_dataset_from_directory to load image dataset from a specific   directory. The dataset is split into training and validation subsets.
  * Normalize Dataset  : Normalizing the dataset to convert pixel values to the range [0,1].
  * Build Model        : Creating a Sequential model with Conv2D layers to extract features from images, MaxPooling2D layers to reduce feature size, and Dense layers for final classification.
  * Compile Model      : Compiling the model using the 'adam' optimizer and 'SparseCategoricalCrossentropy' loss function.
  * Train Model        : Training the model using the fit() method with training and validation datasets for a specified number of epochs.
## Services 
* `Auth`
  * The authentication is responsible for creating users
* `Gateway`
  * The gateway is responsible for managing requests that comes from the frontend
  * Every request that comes from the frontend must pass through the `API Gateway Service`
  * The communication style used in the service is the `Request/Response` pattern.
* `User`
  * The user-service is responsible to manage user for the usage of the dataset
  * Saving to mongodb for scalability
## Docker containers
* create new containers
* set up localhost config
* for all setup run `docker-compose up -d .`
### Run docker compose services
* `redis`
  * `docker compose up -d redis`
* `mongodb`
  * `docker compose up -d mongodb`
* `mysql`
  * `docker compose up -d mysql`
* `rabbitmq`
  * `docker compose up -d redis`
* `elasticsearch`
  * `docker compose up -d elasticsearch`

## Credits 
* `image processing with tensorflow`
 * thanks to https://github.com/img88/ALPR_IndonesiaPlateNumber_ComputerVision
* `plate image`
 * https://universe.roboflow.com/plat-kendaraan/vehicle-and-license-plate

## Result Data 
https://github.com/kmnvz-mayvez/appbg/blob/main/data-user.csv
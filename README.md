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
   
* `Spark`
   * Data Reading: The code loads user data and license plate data from separate CSV files. 
   * Data Merging: User data and license plate data are merged based on the license plate number to create a unified dataset.
   * Feature Preparation: Features for the Linear Regression model are prepared using an assembler to combine features into a single feature vector.
   * Data Splitting: The dataset is split into training and testing sets in an 80:20 ratio for training and evaluating the model.
   * Model Initialization and Training: The Linear Regression model is initialized and trained using the training set.
   * Prediction: The model is used to make predictions of parking costs on the test set.
   * Model Evaluation: The model's performance is evaluated using the Mean Squared Error to measure how well it predicts parking costs.
   * Ultimate Goal: The ultimate goal of the code is to produce a machine learning model that can predict parking costs based on the number of hours used with good accuracy.
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
  * `thanks to` https://github.com/img88/ALPR_IndonesiaPlateNumber_ComputerVision
* `plate image`
  * `thanks to` https://universe.roboflow.com/plat-kendaraan/vehicle-and-license-plate

## <span style="color: #ffff00">Disclaimer</span>

<span>This project is created for educational purposes. The data used in this project is either synthetic or obtained from public sources. Any resemblance to real persons, living or dead, or actual events is purely coincidental.</span>

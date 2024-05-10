# Creating parking app 
Creating a parking app with a microservices and big data approach involves designing a system composed of multiple services (microservices) that work together to efficiently manage parking data. This approach allows for greater scalability, flexibility, and the ability to handle large amounts of data common in parking applications. Using Apache Spark for large-scale data processing, MongoDB for flexible and structured data storage, and Elasticsearch for text search and analysis, the application can offer benefits such as improved scalability, reliability, and better analytical capabilities, ultimately enhancing user experience and parking management efficiency.

## Services 
* `Auth`
  * The authentication is responsible for creating users
* `Gateway`
  * The gateway is responsible for managing requests that comes from the frontend
  * Every request that comes from the frontend must pass through the `API Gateway Service`
  * The communication style used in the service is the `Request/Response` pattern.
* `Computing`
  * Computing is responsible to processing the images
  * Convert the result to json file

## Docker containers
* create new containers
* set up localhost config
* for all setup run `docker-compose up -d .`
### Run docker compose services
* `redis`
  * `docker compose up -d redis`
* `spark`
  * `docker compose up -d spark`
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

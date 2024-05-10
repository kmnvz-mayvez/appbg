# Creating parking app 

## Services 
* `Auth`
  * The authentication is responsible for creating users
* `Gateway`
  * The gateway microservice is responsible for managing requests that comes from the frontend
  * Every request that comes from the frontend must pass through the `API Gateway Service`
  * The communication style used in the service is the `Request/Response` pattern.

## Docker containers
* for new setup just run docker-compose up -d .
* set up localhost config
* create new containers
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
* `image processing`
 * thanks to https://github.com/img88/ALPR_IndonesiaPlateNumber_ComputerVision

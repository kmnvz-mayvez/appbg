# Creating parking app 

## Services 
* `Auth`
  * The authentication is responsible for creating users
* `Gateway`
  * The gateway microservice is responsible for managing requests that comes from the frontend
  * Every request that comes from the frontend must pass through the `API Gateway Service`
  * The communication style used in the service is the `Request/Response` pattern.

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

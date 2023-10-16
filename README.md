
# README

## Overview

This bash script is responsible for starting two microservices APIs for stock queries. It performs the following actions:

1. Enters the `api-service` folder and executes the `docker-compose up --build -d` command to start the API service.

2. Returns to the previous folder.

3. Enters the `stock-service` folder and executes the `docker-compose up --build -d` command to start the Stock service.

4. Retrieves the IP address of the `api-service_api-user_1` container.

5. Returns a link containing the container's IP to access the application.

## Prerequisites

Before using this script, make sure you have the following prerequisites installed on your system:

- [Docker](https://docs.docker.com/get-docker/): Docker must be installed to create and manage containers.
- [Docker Compose](https://docs.docker.com/compose/install/): Docker Compose is required to define and run multi-container Docker applications.
- Create an .env file in the root of both the api-service and stock-service projects. You have to use the content provided in the "Environment" section of this documentation.

## How to Use

Follow the steps below to use this script:

### On Linux (or systems with unix based terminal):

1. Clone this repository on your system:

   ```bash
   SSH: git clone git@git.jobsity.com:mateusdreher/node-challenge.git
   HTTPS: gilt clone https://git.jobsity.com/mateusdreher/node-challenge.git
   ```

2. Navigate to the project folder:
	```bash
	cd your-repository
	```

3. Give execute permission to the bash script
	```bash
	chmod +x setup.sh
	```

4. Execute the script:
	```./start.sh``` or ```sh start.sh``` 

### On Windows

You can use PowerShell or Git Bash as an alternative to run the script on a Windows system:

1. Clone this repository on your system using a Git client or download the ZIP archive from [here](https://git.jobsity.com/mateusdreher/node-challenge/-/archive/master/node-challenge-master.zip).

2. Extract the contents of the ZIP archive to a folder on your system.

3. Open PowerShell or Git Bash.

4. Navigate to the project folder where you extracted the contents of the ZIP archive.

5. Execute the script:
	```bash
	start.sh
	```

## Notes
-   Ensure that Docker and Docker Compose are installed and functioning correctly on your system before running the script.
    
-   If you encounter any issues or errors while running the script, check Docker and Docker Compose settings and ensure that the necessary services are correctly defined in the `docker-compose.yml` files within the `api-service` and `stock-service` folders.


## Enviromnmet

- .env file of api-service:
	```bash
	MONGO_DB_URL=mongodb://jobsity:Passw0rd@db-user:27017/user
	SECRET=f13870539e047ce15b8dd3bb00ec905cd91fb677
	STOCK_API_URL=http://api-stock:3005
	```

- .env file of stock-service
	```bash
	MONGO_DB_URL=mongodb://jobsity:Passw0rd@db-stock:27017/stock
	EXTERNAL_STOCK_URL=https://stooq.com/q/l
	EXTERNAL_STOCK_KEY=sd2t2ohlcvn&h
	```
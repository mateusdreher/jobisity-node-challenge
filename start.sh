#!/bin/bash
docker network create stock-consult-network

cd api-service
docker-compose up --build -d

cd ..

cd stock-service
docker-compose up --build -d

container_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' api-service_api-user_1)

url="${container_ip}:3004/docs"

echo "The application is now running. You can access it by clicking the following link:"
echo "http://${url}"

#!/bin/bash

MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"
source .env.database

# Root credentials
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"

# Network
source .env.network

# Ports
LOCALHOST_PORT=27017
CONTAINER_PORT=27017

# Storage
source .env.volume
VOLUME_CONTAINER_PATH="/data/db"

# Crear red si no existe
#docker network inspect $NETWORK_NAME >/dev/null 2>&1 || docker network create $NETWORK_NAME
source setup.sh

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "A container with the name $DB_CONTAINER_NAME already exists."
    echo "To stop and remove the container run: docker kill $DB_CONTAINER_NAME"
    exit 1
fi

# Levantar MongoDB (sin --rm para que no se borre)
docker run -d --rm --name $DB_CONTAINER_NAME \
    -e MONGODB_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGODB_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
    -p $LOCALHOST_PORT:$CONTAINER_PORT \
    -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
    -v "$(pwd)/db/db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro" \
    --network $NETWORK_NAME \
    $MONGODB_IMAGE:$MONGODB_TAG

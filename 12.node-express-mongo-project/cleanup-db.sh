# 1. Stop and remove mongodb containers
# 2. Remove networks
# 3. Remove volumes

source .env.database
source .env.network
source .env.volume

# container
if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Removing DB container $DB_CONTAINER_NAME"
    docker kill $DB_CONTAINER_NAME # && docker rm $DB_CONTAINER_NAME;
else
    echo "A container with the name $DB_CONTAINER_NAME does not exist. Skipping deletion!"
fi

# volume
if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Removing volume $VOLUME_NAME"
    docker volume rm $VOLUME_NAME;
    echo "Execute: docker volume prune -> yes!"
else
    echo "A volume with the name $VOLUME_NAME does not exist. Skipping deletion!"
fi

# network
if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Removing network $NETWORK_NAME"
    docker network rm $NETWORK_NAME;
else
    echo "A network with the name $NETWORK_NAME does not exist. Skipping deletion!"
fi


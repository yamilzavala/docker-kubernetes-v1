
# if [ "$(docker ps -q -f name=backend)" ]; then
#     echo "A container with the name backend already exists."
#     echo "To stop and remove the container run: docker rm -f backend"
#     exit 1
# else 
#     echo "Creating image key-value-backend"
#     docker build -t key-value-backend -f Dockerfile.dev .
#     echo "Creating container backend"
#     docker run -d --name backend --network key-value-net -p 3000:3000  key-value-backend
# fi

source .env.database
source .env.network

# Ports
LOCALHOST_PORT=3000
CONTAINER_PORT=3000

BACKEND_IMAGE_NAME=key-value-backend
BACKEND_CONTAINER_NAME=backend

MONGODB_HOST=mongodb

if [ "$(docker ps -aq -f name=$BACKEND_CONTAINER_NAME)" ]; then
    echo "A container with the name $BACKEND_CONTAINER_NAME already exists."
    echo "To stop and remove the container run: docker rm -f $BACKEND_CONTAINER_NAME"
    exit 1
fi

#build image
docker build -t $BACKEND_IMAGE_NAME \
     -f backend/Dockerfile.dev \
     backend

# Levantar container
docker run --rm -d --name $BACKEND_CONTAINER_NAME \
        -e KEY_VALUE_DB=$KEY_VALUE_DB \
        -e KEY_VALUE_USER=$KEY_VALUE_USER \
        -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
        -e PORT=$CONTAINER_PORT \
        -e MONGODB_HOST=$MONGODB_HOST \
        -e CHOKIDAR_USEPOLLING=true \
        -v "$(pwd)/backend/src:/app/src" \
        --network $NETWORK_NAME \
        -p $LOCALHOST_PORT:$CONTAINER_PORT \
         $BACKEND_IMAGE_NAME


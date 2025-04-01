if [ "$(docker ps -aq -f name=backend)" ]; then
    echo "Removing DB container backend"
    docker rm -f backend 
else
    echo "A container with the name backend does not exist. Skipping deletion!"
fi
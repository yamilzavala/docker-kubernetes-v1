## key-value-user
docker run --rm -it --network key-value-net mongodb/mongodb-community-server:7.0-ubuntu2204 mongosh mongodb://key-value-user:key-value-password@mongodb/key-value-db

## admin
docker run --rm -it --network key-value-net mongodb/mongodb-community-server:7.0-ubuntu2204 mongosh "mongodb://root-user:root-password@mongodb/admin"
    use key-value-db
    db.getUsers()

## start
./start-db.sh

## clean
./cleanup.sh
docker volume prume 


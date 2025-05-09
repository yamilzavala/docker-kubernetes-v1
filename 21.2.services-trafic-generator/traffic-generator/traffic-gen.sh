#!/bin/sh

# ./traffic-gen.sh www.google.com 2
    # www.google.com: es el destino.
    # 2:              es el intervalo entre solicitudes (en segundos).

# Este bloque verifica si el número de argumentos ($#) es menor que 2. Si es así, muestra el uso correcto y termina con error (exit 1).
#$0: Representa el nombre del script que se está ejecutando (en este caso ./traffic-gen.sh)
#<target>: Es un parámetro de ejemplo que el usuario debe proporciona
#<interval-in-seconds>: Representa cada cuántos segundos se enviará una solicitud HTTP.
#Cuando el usuario no pasa los dos argumentos necesarios, verá algo como: Usage: ./traffic-gen.sh <target> <interval-in-seconds>
if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <target> <interval-in-seconds>"
    exit 1
fi

#TARGET: la URL o IP del destino.
TARGET=$1
#INTERVAL: tiempo de espera entre solicitudes.
INTERVAL=$2

echo "Sending requests to $TARGET every $INTERVAL seconds."

#Entra en un bucle infinito (while true).
#Obtiene la hora actual.
#Usa curl -s para hacer una solicitud HTTP silenciosa al destino.
#Imprime la respuesta junto con la hora.
#Espera INTERVAL segundos antes de repetir.
while true; do
    REQUEST_TIME=$(date +"%Y-%m-%d %H:%M:%S")
    RESPONSE=$(curl -s "$TARGET")

    echo "[$REQUEST_TIME] $RESPONSE"

    sleep $INTERVAL
done
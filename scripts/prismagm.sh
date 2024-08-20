#!/usr/bin/env bash
# prismagm.sh

set -e

host="$1"
shift
cmd="$@"

# Extract hostname and port
hostname=$(echo "$host" | cut -d':' -f1)
port=$(echo "$host" | cut -d':' -f2)

until pg_isready -h "$hostname" -p "$port"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
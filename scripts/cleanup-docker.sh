#!/bin/bash

# Safety prompt
read -p "This will remove all Docker containers, images, volumes, and networks. Are you sure? (y/n): " reply
if [[ $reply =~ ^[Yy]$ ]]
then
    # Stop all running containers
    docker ps -aq | xargs --no-run-if-empty docker stop

    # Prune the system (removes all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes)
    docker system prune -a -f --volumes 

    # Remove all volumes
    docker volume ls -q | xargs --no-run-if-empty docker volume rm 

    # Remove all networks (excluding default bridge, none, and host networks)
    docker network ls --filter type=custom -q | xargs --no-run-if-empty docker network rm

    echo "Docker cleanup is complete."
else
    echo "Docker cleanup canceled."
fi
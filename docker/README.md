# Docker

Docker is a command line tool that runs "containers", which are small contained programs. Docker containers work without
installing anything else, and will automatically download the program when you use them.

Know the following commands:

```
 - List currently running docker containers:
    docker ps

  - List all docker containers (running and stopped):
    docker ps -a

  - Start a container from an image, with a custom name:
    docker run --name container_name image

  - Start or stop an existing container:
    docker start|stop container_name

  - Pull an image from a docker registry:
    docker pull image

  - Open a shell inside of an already running container:
    docker exec -it container_name sh

  - Remove a stopped container:
    docker rm container_name

  - Fetch and follow the logs of a container:
    docker logs -f container_name
```

## Creating a Docker Container

Docker containers should be created for applications that must run on a server and cannot be run with
Vercel (always prefer Vercel). Usually, the reason we create a docker container is because we've used
postgrest, which cannot run on vercel.

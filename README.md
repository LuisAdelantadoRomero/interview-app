# Docker Compose Setup

## Prerequisites

Before starting, make sure you have installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (if you use Docker Desktop, it is already included)

## Docker Compose Configuration

The docker-compose file is already included on the project.

## Start Services with Docker Compose

To start the services defined in `docker-compose.yml`, use the following command:

```sh
docker-compose up --build -d
```

- `-d` (optional) runs the containers in the background ("detached" mode).

If you want to see the service logs in real-time:

```sh
docker-compose logs -f
```

## Stop and Remove Services

To stop the containers without removing them, run:

```sh
docker-compose stop
```

To stop and remove the containers, volumes, and associated networks, use:

```sh
docker-compose down
```

## Check Running Containers

You can check which containers are running with:

```sh
docker ps
```

## Remove Containers and Volumes

If you need to completely clean up the containers and volumes created by Docker Compose, use:

```sh
docker-compose down --volumes
```

## Additional Notes

- If you make changes to `docker-compose.yml`, restart the services with:

  ```sh
  docker-compose up -d --build
  ```

- To access a running container:

  ```sh
  docker exec -it my_node_app sh
  ```

This will open a terminal inside the `my_node_app` container.

---


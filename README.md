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

## Try only the frontend

- If you want to test just the frontend app without executing all the containers you can do it loadind the dataExample.js in the NewProvider.js file

  ```

import exampleNews from '../data/dataExample';

import { useArchivedNews } from "../providers/ArchivedProvider";
const NewsContext = createContext();
const NEWS_URL = process.env.REACT_APP_NEWS_API_URL;
const ARCHIVED_NEWS_URL = process.env.REACT_APP_ARCHIVED_API_URL;


export const NewsProvider = ({ children }) => {
  const { setArchivedNews } = useArchivedNews();
  const [newsList, setNewsList] = useState(exampleNews); //here instead of anempty array we use the exampleNews

  ```


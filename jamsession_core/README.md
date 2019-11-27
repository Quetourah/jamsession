# Jamsession-CORE

## Description
This repo contains the core functionality of the streaming service.

### Functionality:

- [x] Streaming to a browser
- [x] Deployed on a remote server
- [ ] Integrate Troop and FoxDot (Python Interpreter)
- [ ] API/endpoint to passthrough user generated code

### Running the Docker service:
1. clone repo
1. install docker with `chmod +x install-docker.sh && sudo sh install-docker.sh`
1. build the image `sudo sh build_docker_image.sh`
1. run the service in the background `sudo sh start_docker_container.sh`

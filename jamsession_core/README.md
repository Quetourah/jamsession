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
1. install docker with `chmod +x install-docker.sh`
1. build the image `sudo docker build -t scradio .`
1. run the service in the background `sudo docker run -p -d 8000:8000 scradio`

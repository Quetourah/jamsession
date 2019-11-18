#!/bin/bash

docker stop version1
docker run -p 8000:8000 --name version1 version1

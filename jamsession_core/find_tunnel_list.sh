#!/bin/bash

export TUNNEL="$(curl http://localhost:4040/api/tunnels)"
export WEBHOOK_URL="$(curl http://localhost:4040/api/tunnels | jq '.tunnels | keys[] as $k | "\(.[$k] | .name), \(.[$k] | .public_url)"')"

echo $WEBHOOK_URL


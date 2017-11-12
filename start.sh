docker service create \
   -p 8089:8089 \
   --name swarm-den \
   --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
   --constraint 'node.role==manager' jdusek/swarm-den:0.1
## Swarm-den
version 0.0.1 (very early version)

Simple tool for showing online/offline services in swarm for development. Still in development(not secure + bugs).

```
docker service create \
   -p 8089:8089 \
   --name swarm-den \
   --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
   --constraint 'node.role==manager' jdusek/swarm-den:0.1
```

if you need some kind of authorization you can set user and pass env
```
docker service create \
   -p 8089:8089 \
   --env user=yourusername \
   --env pass=yourpassword \
   --name swarm-den \
   --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
   --constraint 'node.role==manager' jdusek/swarm-den:0.1
```
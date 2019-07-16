
# cypherapp-mempool

## Manually
### Install

1. Install server dependencies: ```npm run server-deps```
2. Install client dependencies: ```npm run client-deps```

### Run

1. Run server: ```npm run server```
2. Run webclient / webapp: xxxxxx

## Using docker

1. Build image: ```docker build -t cypherapp-mempool:v0.0.1 .```
2. Exec container: ```docker run --rm -it -d -p 3000:3000 --network cyphernodenet cypherapp-mempool:v0.0.1 `id -u cyphernode`:`id -g cyphernode````
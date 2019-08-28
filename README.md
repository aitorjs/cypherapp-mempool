
# cypherapp-mempool

## Manually
### Install

1. Install server dependencies: ```npm run server-deps```
2. Install client dependencies: ```npm run client-deps```

### Run

1. Run server: ```npm run server```
2. Run webclient / webapp: xxxxxx

## Using docker

0. Have cyphernode running with the chain up-to-date
1. Build image: ```npm run docker-build-image```
2. Exec container: ```npm run docker-run```
3. Open webapp on ```http://localhost:3000```

## Using docker-composer

0. Have cyphernode running with the chain up-to-date
1. Build image: ```npm run docker-build-image``
2. Up docker-compose configuration: ```npm run docker-compose-up```
3. Open webapp on ```https://localhost/mempool```

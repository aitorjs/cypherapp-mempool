
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
1. Create ```.env``` file in the root of the project as
```json
{
  "cypherApi": "CYPHERAPI-KEY" (*), // https://gatekeeper:2009/v0
  "h64": "H64-KEY",
  "apiId": "APIID-KEY",
  "apiKey": "APIKEY-KEY"
}
```
2. Build image: ```npm run docker-build-image```
3. Exec container: ```npm run docker-run```
4. Open webapp on ```http://localhost:3000```

## Using docker-composer

0. Have cyphernode running with the chain up-to-date
1. Create ```.env``` file in the root of the project as:
```json
{
  "cypherApi": "CYPHERAPI-KEY" (*), // https://gatekeeper:2009/v0
  "h64": "H64-KEY",
  "apiId": "APIID-KEY",
  "apiKey": "APIKEY-KEY"
}
```
2. Build image: ```npm run docker-build-image```
3. Up docker-compose configuration: ```npm run docker-compose-up```
4. Open webapp on ```https://localhost/mempool```


## Notes

- (*) In .env.cypherApi file, use ```127.0.0.1``` outside docker
and ```gatekeeper``` inside docker.


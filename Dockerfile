FROM node:12-alpine as builder

ENV HOME /cypherapp_mempool

RUN apk add --update --no-cache \
    su-exec

WORKDIR ${HOME}

COPY LICENSE ./
COPY package.json ./

COPY server/lib/* ./server/lib/
COPY server/.env ./server
COPY server/LICENSE ./server
COPY server/package.json ./server
COPY server/server.js ./server

COPY client/dist/* ./client/

RUN npm run server-deps

# ENTRYPOINT ["su-exec"]

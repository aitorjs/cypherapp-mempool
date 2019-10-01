FROM node:12-alpine

ENV HOME /cypherapp_mempool

# Enable OpenRC
# ENV INITSYSTEM on 

RUN apk add --update --no-cache \
    su-exec

WORKDIR ${HOME}

COPY LICENSE ./
COPY package.json ./

COPY server/index.js ./server/index.js
COPY server/package.json ./server/package.json
COPY server/package-lock.json ./server/package-lock.json
COPY server/public/* ./server/public/
COPY server/README.md ./server/README.md
COPY server/src ./server/src/
COPY server/.env ./server/.env

# COPY server/lib/* ./server/lib/
# COPY server/.env ./server
# COPY server/LICENSE ./server
# COPY server/package.json ./server
# COPY server/package-lock.json ./server
# COPY server/server.js ./server
# COPY server/cypherapp-mempool.service ./server

COPY client/dist ./client/dist/

RUN npm run server-deps

CMD ["npm", "run", "server"]

# ENTRYPOINT ["su-exec"]

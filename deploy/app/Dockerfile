ARG NODE_VERSION

# Base system image with specific version of node and npm
FROM node:${NODE_VERSION}-alpine AS node-npm
ARG NPM_VERSION
RUN apk --no-cache add curl
RUN npm config set audit=false fund=false loglevel=error omit=dev update-notifier=false
RUN npm i -g npm@${NPM_VERSION}

# Base application image with dependencies installed
FROM node-npm AS app-base
WORKDIR /usr/src/app
COPY package*.json .npmrc ./
RUN npm ci --prefer-offline --production --ignore-scripts

# Application image with dist
FROM app-base AS app
WORKDIR /usr/src/app
COPY --from=app-base /usr/src/app/package*.json ./
RUN true # See https://github.com/moby/moby/issues/37965
COPY --from=app-base /usr/src/app/node_modules/ ./node_modules
RUN true
COPY ./lib/ ./lib
RUN true
COPY ./dist/client/ ./dist/client
RUN true
COPY ./assets/ ./assets
EXPOSE 3000
CMD ["node", "lib/back/main/index.js"]

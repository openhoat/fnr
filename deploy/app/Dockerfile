ARG NODE_VERSION

# Base system image with specific version of node and npm
FROM node:${NODE_VERSION}-slim AS node-npm
ARG NPM_VERSION
RUN apt-get update -qq && \
    apt-get install -y build-essential curl pkg-config python-is-python3
RUN npm config set audit=false fund=false loglevel=error omit=dev update-notifier=false
RUN npm i -g npm@${NPM_VERSION}

# Base application image with dependencies installed
FROM node-npm AS app-base
WORKDIR /usr/src/app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --prefer-offline --include=dev --ignore-scripts

# Built application image
FROM app-base AS app-build
WORKDIR /usr/src/app
COPY --from=app-base /usr/src/app/package.json /usr/src/app/package-lock.json ./
RUN true # See https://github.com/moby/moby/issues/37965
COPY --from=app-base /usr/src/app/node_modules/ ./node_modules
RUN true
COPY .swcrc postcss.config.ts tailwind.config.ts vite.config.js tsconfig.json ./
RUN true
COPY ./src/ ./src
RUN true
COPY ./swagger/ ./swagger
RUN true
COPY ./assets/ ./assets
RUN npm run build && npm prune --omit=dev --ignore-scripts

# Application image with dist
FROM app-base AS app
WORKDIR /usr/src/app
COPY --from=app-base /usr/src/app/package.json /usr/src/app/package-lock.json ./
RUN true # See https://github.com/moby/moby/issues/37965
COPY --from=app-base /usr/src/app/node_modules/ ./node_modules
RUN true
COPY --from=app-build /usr/src/app/lib/ ./lib
RUN true
COPY --from=app-build /usr/src/app/dist/client/ ./dist/client
RUN true
COPY --from=app-build /usr/src/app/dist/apidoc/ ./dist/apidoc
RUN true
COPY ./swagger/ ./swagger
RUN true
COPY ./assets/ ./assets
EXPOSE 3000
CMD ["node", "lib/back/main/index.js"]

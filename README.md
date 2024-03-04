[![build](https://github.com/openhoat/fnr/actions/workflows/build.yaml/badge.svg)](https://github.com/openhoat/fnr/actions/workflows/build.yaml)
[![codecov](https://codecov.io/gh/openhoat/fnr/graph/badge.svg?token=2C93UD9SLJ)](https://codecov.io/gh/openhoat/fnr)
[![deploy](https://github.com/openhoat/fnr/actions/workflows/deploy.yaml/badge.svg)](https://github.com/openhoat/fnr/actions/workflows/deploy.yaml)

# Fullstack Node React TS template

## Getting started

First step you need to clone the project with this command:

```shell
git clone https://github.com/openhoat/fnr.git
```

Next step you need to install Node.js to install all the dependencies with npm or yarn:

```shell
npm install
```
or 
```shell
yarn install
```


## Before Start

```shell
npm run build
```

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

After installing Node.js, all the packages and build the project, we are now ready to start with
```shell
npm start
``` 
or
```shell
npm run dev
```
which does not require a build.

Runs the app in the development mode.  

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Port:3000 is the default setting you can change it in the .env file.

The page will reload if you make edits.  

You will also see any lint errors in the console.

> TODO
> - Lancer la stack : `docker compose up -d`
> - Les scripts sous bin sont là pour builder en mode 'multiplateforme' (par exemple pour le Raspberry Pi)

## Deployment

We have a docker container. You'll find the parameters in the **docker-compose.yaml** file, along with the containerization instruction.

Note that some parts of the script, such as the environment variables **${NODE_VERSION}, ${NPM_VERSION}, ${CONTAINER_REGISTRY_PREFIX}, ${PORT}, ${HOST}, ${TRAEFIK_APP_VIRTUAL_HOST}, ${TRAEFIK_APP_ENTRYPOINTS},** require specific values to be fully functional.

The bash Build file script is used to automate project construction using **npm** and **Docker**.

### Here are some commands to build your dockers image :

- **`docker-compose build`**  -Only builds the images, do not start the containers

- **`docker-compose up`**  -Build the images if required and start the containers

- **`docker-compose up --build`**  -Forced to build the images even when not needed

- **`docker-compose up --no-build`**  -Skips the image build process abd start the containers

> TODO : sonar

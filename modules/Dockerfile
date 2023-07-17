ARG NODE_BASE_VERSION="node:14.21.2"

FROM ${NODE_BASE_VERSION} AS dev

WORKDIR /data
COPY app/package.json ./app/package.json
COPY app/yarn.lock ./app/yarn.lock
COPY server/package.json ./server/package.json
COPY server/yarn.lock ./server/yarn.lock

WORKDIR /data/app
RUN yarn

WORKDIR /data/server
RUN yarn
ARG NODE_VERSION="node:22.11.0-alpine"

FROM ${DOCKER_PUBLIC_REPO}/${NODE_VERSION} AS dev

WORKDIR /data
COPY server/package.json ./server/package.json
COPY server/yarn.lock ./server/yarn.lock

WORKDIR /data/server
RUN yarn

RUN apk add chromium

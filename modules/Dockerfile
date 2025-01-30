ARG NODE_VERSION="node:22.13.1-alpine"

FROM ${DOCKER_PUBLIC_REPO}/${NODE_VERSION} AS dev

WORKDIR /data
COPY server/package.json ./server/package.json
COPY server/yarn.lock ./server/yarn.lock

WORKDIR /data/server
RUN yarn --frozen-lockfile

RUN apk add chromium

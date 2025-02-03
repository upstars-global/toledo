ARG NODE_VERSION="node:22.11.0-alpine3.19"

FROM ${DOCKER_PUBLIC_REPO}/${NODE_VERSION} AS dev

WORKDIR /data
COPY server/package.json ./server/package.json
COPY server/yarn.lock ./server/yarn.lock

WORKDIR /data/server
RUN yarn --frozen-lockfile

RUN apk add chromium

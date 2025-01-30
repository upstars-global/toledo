ARG NODE_VERSION=${DOCKER_PUBLIC_REPO}/node:22.11.0

FROM ${NODE_BASE_VERSION}-alpine AS dev

WORKDIR /data
COPY server/package.json ./server/package.json
COPY server/yarn.lock ./server/yarn.lock

WORKDIR /data/server
RUN yarn

RUN apk add chromium

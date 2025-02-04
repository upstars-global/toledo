ARG NODE_VERSION="node:22.11.0-alpine3.19"

FROM ${NODE_VERSION} AS prod

WORKDIR /data/server
COPY server ./
RUN yarn --frozen-lockfile

RUN apk add chromium
CMD yarn server

EXPOSE 3000
EXPOSE 9229

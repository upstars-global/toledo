ARG NODE_BASE_VERSION="node:12.22.0"

FROM ${NODE_BASE_VERSION} AS dev

WORKDIR /data
COPY app/package.json ./app
COPY app/yarn.lock ./app

RUN set -x \
    cd app \
    yarn

FROM dev AS build

WORKDIR /data

RUN yarn build


FROM ${NODE_BASE_VERSION}-alpine AS prod

WORKDIR /data
COPY server ./server
RUN set -x \
    cd server \
    yarn \
    apk add chromium  \

COPY --from=build /data/app/dist /data/app/dist

EXPOSE 3000
CMD yarn server
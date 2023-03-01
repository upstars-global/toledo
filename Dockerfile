ARG NODE_BASE_VERSION="node:14.21.2"

FROM ${NODE_BASE_VERSION} AS dev-app

WORKDIR /data
COPY app/package.json ./
COPY app/yarn.lock ./

RUN yarn

FROM ${NODE_BASE_VERSION} AS dev-server

WORKDIR /data
COPY server/package.json ./
COPY server/yarn.lock ./

RUN yarn

FROM dev-app AS build

WORKDIR /data
COPY app ./

RUN yarn build


FROM ${NODE_BASE_VERSION}-alpine AS prod

WORKDIR /data

COPY server ./server
RUN apk add chromium
COPY --from=dev-server /data/node_modules /data/server/node_modules
COPY --from=build /data/dist /data/app/dist

EXPOSE 3000
EXPOSE 9229
CMD cd server && yarn server
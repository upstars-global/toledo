ARG NODE_BASE_VERSION="registry.digitalocean.com/bbq/toledo:develop-modules"

FROM ${NODE_BASE_VERSION} AS prod

WORKDIR /data/app
COPY app ./
RUN yarn build

WORKDIR /data/server
COPY server ./
CMD yarn server

EXPOSE 3000
EXPOSE 9229
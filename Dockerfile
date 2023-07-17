ARG NODE_BASE_VERSION="registry.digitalocean.com/bbq/toledo:develop-modules"

FROM ${NODE_BASE_VERSION} AS prod

RUN apk add chromium

WORKDIR /data
COPY app ./app
RUN cd app && yarn build

CMD cd /deta/server && yarn server

EXPOSE 3000
EXPOSE 9229
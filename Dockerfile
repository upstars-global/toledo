ARG NODE_BASE_VERSION="240729534178.dkr.ecr.eu-west-1.amazonaws.com/whitelabel:toledo_fp-1708_275373-modules"

FROM ${NODE_BASE_VERSION} AS prod

WORKDIR /data/server
COPY server ./
CMD yarn server

EXPOSE 3000
EXPOSE 9229
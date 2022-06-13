FROM node:12.22.0-alpine AS dev

WORKDIR /data
COPY ./ ./

RUN yarn
RUN yarn build
RUN apk add chromium

EXPOSE 3000
CMD yarn server
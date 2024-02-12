FROM node:16-alpine

RUN apk update && apk add build-base g++ python3 bash

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .
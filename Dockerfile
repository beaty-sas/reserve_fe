FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN apk update && apk add build-base g++ python3 bash \
  && npm install
COPY . .

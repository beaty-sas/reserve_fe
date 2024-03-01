FROM node:21-alpine

WORKDIR /app

COPY . .

RUN npm install yarn
RUN yarn && yarn build
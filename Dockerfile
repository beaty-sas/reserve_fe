FROM node:21-alpine

WORKDIR /app


ENV NEXT_PUBLIC_HOST_API=https://api.reserve.expert
ENV NEXT_PUBLIC_HOST=https://reserve.expert

COPY . .

RUN npm install yarn
RUN yarn && yarn build

EXPOSE 8083

CMD ["yarn", "start"]

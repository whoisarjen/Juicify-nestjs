FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/

EXPOSE 80

CMD "npm" "run" "start:dev"
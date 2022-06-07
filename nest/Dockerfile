FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm install --force

COPY . /app/

EXPOSE 5000

CMD "npm" "run" "start:dev"
FROM node:8.9-alpine

ADD  . /app
WORKDIR /app
RUN  npm install --production

CMD  npm run start
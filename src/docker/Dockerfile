# syntax=docker/dockerfile:1

 FROM node:16-alpine

# set working directory

# RUN apk add --no-cache python g++ make
# WORKDIR /app
# COPY . .

RUN mkdir -p ...
COPY . /usr/scr/restaurant_api
WORKDIR /usr/scr/restaurant_api
ENV PATH /usr/scr/restaurant_api/node_modules/.bin:$PATH

# RUN yarn install --production
 RUN npm install

 CMD ["npm", "start"]
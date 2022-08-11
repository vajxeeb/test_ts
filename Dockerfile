FROM node:16-alpine
# ENV NODE_ENV $NODE_ENV
WORKDIR /app
COPY package.json /app 
# COPY .env /app

# COPY package-lock.json /app/package-lock.json
RUN npm install
RUN npm install typescript -g
COPY . /app

EXPOSE 7000

CMD ["npm", "start"]

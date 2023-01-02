FROM --platform=linux/amd64 node:16.13.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm ci --only=production

COPY . .

CMD [ "npm", "run", "build" ]

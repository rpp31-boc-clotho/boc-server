FROM node:14-alpine

EXPOSE 3000

WORKDIR /app

RUN npm install i npm@latest -g --

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD ["node", "server/server.js"]
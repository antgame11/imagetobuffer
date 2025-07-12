FROM node:22

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD sh -c "node index.js"
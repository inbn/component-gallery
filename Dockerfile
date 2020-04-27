FROM amio/node-chrome

COPY package.json package-lock.json ./

RUN npm ci

CMD npm run test:loki

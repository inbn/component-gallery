FROM zenika/alpine-chrome:with-node

COPY package.json package-lock.json ./

RUN npm ci

RUN npm run build-storybook

CMD npm run loki:update

FROM node:12.4 AS base

# Install Chrome
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN set -x \
  && apt-get update \
  && apt-get install -y \
  google-chrome-stable

ENV CHROME_BIN /usr/bin/google-chrome

COPY package.json package-lock.json ./

RUN npm ci

RUN npm run build-storybook

CMD npm run loki:update

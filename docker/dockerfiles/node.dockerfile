FROM node:17

WORKDIR /var/www/html

RUN npm install -g npm

ENTRYPOINT [ "npm" ]

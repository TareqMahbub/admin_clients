FROM nginx:1.20.1-alpine

WORKDIR /etc/nginx/conf.d

COPY ./docker/nginx/nginx.conf .

RUN mv nginx.conf default.conf


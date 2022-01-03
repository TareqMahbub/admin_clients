FROM php:8.0.12-fpm-alpine3.14

# WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html
COPY . .

RUN chown -R www-data:www-data /var/www/html/public
RUN chown -R www-data:www-data /var/www/html/storage

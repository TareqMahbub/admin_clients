List of Packages:

- [Dependencies](#dependencies)
- [Deploy on Windows](#deploy-on-windows)
- [Deploy using Docker (on any machine)](#deploy-using-docker-on-any-machine)
- [Deploy on Linux](#deploy-on-linux)

# Dependencies

Following dependencies must be present to run the application:

-   PHP 7.4+ or 8+
-   MySQL 8
-   Composer 2.x.x
-   Node 17.x.x
-   NPM 8.x.x
-   Git 2.x.x

# Deploy on Windows

-   Execute following commands ("Tested & Confirmed" on Windows 11 machine)

```
git clone git@github.com:TareqMahbub/admin_clients.git
cd admin_clients
composer install
ren .env.example .env
php artisan key:generate
```

-   Create a database for the Application
-   Update the .env file with necessary DB name & credentials
-   After that execute following command:

```
php artisan migrate
npm install
npm run prod
php artisan serve
```

# Deploy using Docker (on any machine)

-   Execute following commands to run the app from docker ("Tested & Confirmed" on Docker Desktop 4.3.2)
-   You may need to execute a "sudo su" command on linux before these commands

```
git clone git@github.com:TareqMahbub/admin_clients.git
cd admin_clients
ren docker.env .env (on linux: mv docker.env .env)
docker-compose up -d --build mysql
docker-compose run --rm composer install
docker-compose run --rm artisan migrate
docker-compose run --rm npm install
docker-compose run --rm npm run prod
docker-compose build
docker-compose up -d server
docker container ls
```

-   if all containers are running, you can visit: http://localhost:8000/

# Deploy on Linux

-   Execute following commands ("Tested & Confirmed" on Cent OS 8)

```
sudo su
ssh-keygen -t rsa -b 4096 (if not exists)

(sometimes if github doesn't recognize your machine, your public key needs to be added on GitHub as Deploy keys, let me know, I'll add it for you)

git clone git@github.com:TareqMahbub/admin_clients.git
cd admin_clients
chmod -R 775 ./storage ./bootstrap
composer install
mv .env.example .env
php artisan key:generate
```

-   Create a database for the Application
-   Update the .env file with necessary DB name & credentials
-   After that execute following command:

```
php artisan migrate
npm install
npm run prod
php artisan serve
```

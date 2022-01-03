List of Packages:

- [Dependencies](#dependencies)
- [Deploy on Windows](#deploy-on-windows)
- [Deploy using Docker](#deploy-using-docker)
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

-   Execute following commands

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
npm run prod
php artisan serve
```

-

# Deploy using Docker

# Deploy on Linux

-   git pull git@github.com:TareqMahbub/admin_clients.git

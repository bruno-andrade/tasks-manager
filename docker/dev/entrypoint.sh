#!/bin/bash

cd /app
composer config http-basic.backpackforlaravel.com weefinterativa90193581 NBfI4X3yiGUj
 if [ ! -d "vendor" ]; then
    composer install
 fi
php artisan storage:link --force
php artisan optimize
php artisan migrate --force
php artisan key:generate
php artisan config:clear
# echo "memory_limit = 512M" >> /usr/local/etc/php/php.ini
# echo "max_execution_time = 30" >> /usr/local/etc/php/php.ini

supervisord -c /etc/supervisor/supervisord.conf

exec "$@"
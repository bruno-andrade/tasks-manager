#!/bin/bash

php artisan storage:link --force
php artisan optimize
php artisan migrate --force

supervisord -c /etc/supervisor/supervisord.conf

exec "$@"

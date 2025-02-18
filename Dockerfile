FROM dunglas/frankenphp:1.3.2-php8.3.14
WORKDIR /app
COPY . /app

RUN apt-get update -y && apt-get install -y openssl zip unzip git nodejs npm supervisor && rm -rf /var/lib/apt/lists/*
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN install-php-extensions pdo pcntl pdo_mysql pdo_pgsql
RUN composer config http-basic.backpackforlaravel.com weefinterativa90193581 NBfI4X3yiGUj
RUN composer install
RUN php artisan octane:install --server=frankenphp

RUN npm ci
RUN npm run build

RUN echo "memory_limit = 512M;" > "$PHP_INI_DIR/conf.d/memory.ini"

# Adiciona o arquivo de configuração do Supervisor para o Laravel Worker
COPY laravel-worker.conf /etc/supervisor/conf.d/laravel-worker.conf

RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0"]
EXPOSE 8000
FROM laravelsail/php83-composer:latest
COPY . /app
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl zip unzip git libpq-dev supervisor && rm -rf /var/lib/apt/lists/* 

RUN docker-php-ext-install pdo pcntl pdo_mysql  pdo_pgsql

# # Adiciona o arquivo de configuração do Supervisor para o Laravel Worker
COPY laravel-worker.conf /etc/supervisor/conf.d/laravel-worker.conf

RUN chmod +x /app/docker/dev/entrypoint.sh

ENTRYPOINT ["sh", "/app/docker/dev/entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
EXPOSE 8000

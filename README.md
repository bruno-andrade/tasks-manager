# Projeto de Gerenciamento de Tarefas

Este projeto é uma aplicação web para gerenciamento de tarefas categorizadas, desenvolvida utilizando **Laravel** para o backend e **Next.js** para o frontend. A aplicação permite cadastrar, listar, editar e excluir tarefas, vinculando cada uma a uma categoria.

## Como Iniciar o Projeto

### 1. Configurar o Backend (Laravel)

#### 1.1 Inicialize o container 
```sh
docker-compose up
```

#### 1.2 Gerar Chave de Aplicação

```sh
docker-compose exec laravel php artisan key:generate
```

#### 1.3 Executar Migrações e Seeders

```sh
docker-compose exec laravel php artisan migrate:fresh --seed
```

#### 1.4 Iniciar o Servidor Laravel

O servidor deve estar funcional em http://localhost:8000

A senha do seu usuário será:

Usuário: bruno@teste.com
Senha: senha123

---

### 2. Configurar o Frontend (Next.js)

#### 2.1 Navegar para a Pasta do Frontend

```sh
cd resources/tasks_manager_frontend
```

#### 2.2 Instalar Dependências

```sh
npm install
```

#### 2.3 Criar um Arquivo `.env`

Verifique se o .env está no local indicado

Edite as variáveis conforme seu backend:


#### 2.4 Rodar o Servidor Next.js

```sh
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

---

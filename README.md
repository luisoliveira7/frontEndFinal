# Sistema de Controle de Despesas

Projeto integrador das disciplinas de Desenvolvimento Back-end e Desenvolvimento Front-end (SENAC Joinville).

## Estrutura do projeto

```
ProjetoIntegrador/
  backend/
    Atividade-2-/   → API RESTful (Node.js, Express, Sequelize, MySQL)
  frontend/         → Aplicação React (consome a API)
```

## Como rodar o projeto completo

### 1. Banco de dados

Inicie o MySQL (XAMPP ou similar) e crie um banco de dados chamado `mvc`.

### 2. Back-end

Entre na pasta do back-end:
```
cd backend/Atividade-2-
```

Instale as dependências:
```
npm install
```

Crie um arquivo `.env` dentro de `backend/Atividade-2-` com o seguinte conteúdo:
```
JWT_SECRET=segredo_super_secreto
JWT_EXPIRES_IN=1d
DB_NAME=mvc
DB_USER=root
DB_PASS=
DB_HOST=127.0.0.1
```

Inicie o servidor:
```
node app.js
```

O back-end vai rodar em `http://localhost:3000`.

### 3. Front-end

Em outro terminal, entre na pasta do front-end:
```
cd frontend
```

Instale as dependências:
```
npm install
```

Crie um arquivo `.env` dentro de `frontend` com o seguinte conteúdo:
```
VITE_API_URL=http://localhost:3000
```

Inicie o projeto:
```
npm run dev
```

O front-end vai rodar em `http://localhost:5173`.

### 4. Acessando o sistema

Acesse `http://localhost:5173` no navegador. Crie uma conta na tela de cadastro e faça login para acessar o sistema.

## Tecnologias utilizadas

**Back-end:** Node.js, Express, Sequelize, MySQL, JWT, bcrypt

**Front-end:** React, React Router DOM, Axios, Context API, Bootstrap

## Funcionalidades

- Cadastro e login de usuário com autenticação JWT
- Dashboard com total de gastos, quantidade de despesas, gastos por categoria e últimas despesas cadastradas
- CRUD completo de categorias
- CRUD completo de despesas
- Filtros de despesas por status, categoria, valor e data
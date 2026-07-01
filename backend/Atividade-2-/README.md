# Sistema de Controle de Despesas

## Sobre
API RESTful para controle de despesas pessoais feita em Node.js com Express, Sequelize e MySQL, seguindo o padrão MVC.

## Tecnologias usadas
- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcrypt
- dotenv

## Estrutura do projeto
```
src/
  config/        → configurações de autenticação e banco
  controllers/   → regras e validações
  database/      → migrations e seeders
  middlewares/   → autenticação JWT
  models/        → conexão com banco e definição das tabelas
  routes/        → rotas da API
  views/         → recebe req/res e chama os controllers
app.js           → inicialização do servidor
```

## Como rodar

### 1. Instalar dependências
```
npm install
```

### 2. Criar o banco de dados
Inicia o XAMPP (ou outro serviço MySQL) e cria um banco chamado `mvc`.

### 3. Criar o arquivo .env
Na raiz do projeto, cria um arquivo chamado `.env` com o seguinte conteúdo:
```
JWT_SECRET=segredo_super_secreto
JWT_EXPIRES_IN=1d
DB_NAME=mvc
DB_USER=root
DB_PASS=
DB_HOST=127.0.0.1
```
Esse arquivo não vem no repositório por questões de segurança, por isso precisa ser criado manualmente.

### 4. Rodar o servidor
```
node app.js
```

Vai rodar em: http://localhost:3000

## Rotas

### Auth (públicas)
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /users | Cadastrar usuário |
| POST | /auth/login | Login, retorna token JWT |

### Categorias (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /categories | Listar categorias |
| GET | /categories/:id | Buscar por id |
| POST | /categories | Criar categoria |
| PUT | /categories/:id | Atualizar categoria |
| DELETE | /categories/:id | Remover categoria |

### Despesas (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /expenses | Listar despesas do usuário |
| GET | /expenses/:id | Buscar por id |
| POST | /expenses | Criar despesa |
| PUT | /expenses/:id | Atualizar despesa |
| DELETE | /expenses/:id | Remover despesa |

### Filtros disponíveis
```
GET /expenses?status=PAGA
GET /expenses?categoriaId=1
GET /expenses?valorMin=50&valorMax=200
GET /expenses?dataInicio=2026-01-01&dataFim=2026-12-31
```

### Dashboard (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /dashboard/total-expenses | Total gasto |
| GET | /dashboard/expenses-count | Quantidade de despesas |
| GET | /dashboard/expenses-by-category | Total por categoria |

## Exemplo de uso

### Cadastrar usuário
```json
POST /users
{
  "nome": "Luis",
  "email": "luis@email.com",
  "senha": "123456"
}
```

### Login
```json
POST /auth/login
{
  "email": "luis@email.com",
  "senha": "123456"
}
```
Retorna:
```json
{ "token": "eyJ..." }
```

### Criar despesa (com token no Authorization Bearer)
```json
POST /expenses
{
  "descricao": "Mercado",
  "valor": 100,
  "data": "2026-06-01",
  "status": "PAGA",
  "categoriaId": 1
}
```

## Relacionamentos
- Um usuário possui várias despesas
- Uma categoria possui várias despesas
- Uma despesa pertence a um usuário
- Uma despesa pertence a uma categoria

## Segurança
- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Rotas protegidas por middleware
- Cada usuário acessa apenas as próprias despesas
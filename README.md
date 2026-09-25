# Biblioteca API

API REST para gerenciamento de uma biblioteca, desenvolvida como atividade prática da disciplina de Desenvolvimento Web 2. O projeto utiliza Node.js, Express, Sequelize e SQLite para realizar o cadastro e gerenciamento de autores, livros e categorias.

## Integrantes

* **Gabriel Lohan Queiroz Sátiro**
* **Lucas Gabriel Silva Maciel**

## Tecnologias utilizadas

* **Node.js** — ambiente de execução da aplicação
* **Express** — criação da API REST e gerenciamento das rotas
* **Sequelize** — ORM para interação com o banco de dados
* **SQLite** — banco de dados utilizado pela aplicação

## Funcionalidades

A API permite:

* Cadastrar, listar, consultar, atualizar e excluir autores;
* Cadastrar, listar, consultar, atualizar e excluir livros;
* Cadastrar, listar, consultar, atualizar e excluir categorias;
* Associar livros a autores;
* Associar livros a categorias;
* Consultar livros juntamente com seus autores e categorias;
* Realizar buscas de livros por título, ano e disponibilidade;
* Combinar diferentes filtros;
* Utilizar paginação na consulta de livros.

## Estrutura do projeto

```text
biblioteca-api/
│
├── database/
│   └── biblioteca.sqlite
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── models/
│   │   ├── Autor.js
│   │   ├── Livro.js
│   │   ├── Categoria.js
│   │   └── index.js
│   │
│   ├── repositories/
│   │   ├── AutorRepository.js
│   │   ├── LivroRepository.js
│   │   └── CategoriaRepository.js
│   │
│   ├── services/
│   │   ├── AutorService.js
│   │   ├── LivroService.js
│   │   └── CategoriaService.js
│   │
│   ├── controllers/
│   │   ├── AutorController.js
│   │   ├── LivroController.js
│   │   └── CategoriaController.js
│   │
│   ├── routes/
│   │   ├── autorRoutes.js
│   │   ├── livroRoutes.js
│   │   └── categoriaRoutes.js
│   │
│   └── app.js
│
├── package.json
├── package-lock.json
└── README.md
```

## Como instalar

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/Lohan-qrz/biblioteca-api.git
cd biblioteca-api
```

Em seguida, instale as dependências:

```bash
npm install
```

## Como executar

Para iniciar a aplicação:

```bash
npm start
```

A API será executada localmente conforme a configuração do projeto.

## Banco de dados

O projeto utiliza o **SQLite** como banco de dados e o **Sequelize** como ORM.

O banco utilizado pela aplicação é:

```text
database/biblioteca.sqlite
```

As entidades principais são:

* **Autor**
* **Livro**
* **Categoria**

### Relacionamentos

Um autor pode possuir vários livros, enquanto cada livro pertence a um único autor:

```text
Autor 1 ─────────── N Livro
```

Um livro pode pertencer a várias categorias e uma categoria pode possuir vários livros:

```text
Livro N ─────────── N Categoria
```

Essa relação é realizada por meio da tabela associativa:

```text
livro_categorias
```

## Rotas da API

### Autores

| Método | Rota           | Descrição               |
| ------ | -------------- | ----------------------- |
| POST   | `/autores`     | Criar um autor          |
| GET    | `/autores`     | Listar todos os autores |
| GET    | `/autores/:id` | Buscar um autor pelo ID |
| PUT    | `/autores/:id` | Atualizar um autor      |
| DELETE | `/autores/:id` | Excluir um autor        |

### Exemplo — criar autor

```http
POST /autores
```

```json
{
  "nome": "Machado de Assis",
  "email": "machado@email.com",
  "nacionalidade": "Brasileiro"
}
```

---

### Livros

| Método | Rota          | Descrição               |
| ------ | ------------- | ----------------------- |
| POST   | `/livros`     | Criar um livro          |
| GET    | `/livros`     | Listar livros           |
| GET    | `/livros/:id` | Buscar um livro pelo ID |
| PUT    | `/livros/:id` | Atualizar um livro      |
| DELETE | `/livros/:id` | Excluir um livro        |

### Exemplo — criar livro

```http
POST /livros
```

```json
{
  "titulo": "Dom Casmurro",
  "isbn": "9780000000001",
  "ano": 1899,
  "autorId": 1
}
```

---

### Categorias

| Método | Rota              | Descrição                    |
| ------ | ----------------- | ---------------------------- |
| POST   | `/categorias`     | Criar uma categoria          |
| GET    | `/categorias`     | Listar todas as categorias   |
| GET    | `/categorias/:id` | Buscar uma categoria pelo ID |
| PUT    | `/categorias/:id` | Atualizar uma categoria      |
| DELETE | `/categorias/:id` | Excluir uma categoria        |

---

## Associação entre livros e categorias

Para associar uma categoria a um livro, utiliza-se:

```http
POST /livros/:livroId/categorias/:categoriaId
```

### Exemplo

```http
POST /livros/1/categorias/2
```

Nesse exemplo, a categoria de ID `2` é associada ao livro de ID `1`.

## Consultas de livros

A rota de livros permite realizar consultas utilizando filtros.

### Filtrar por título

```http
GET /livros?titulo=dom
```

### Filtrar por ano

```http
GET /livros?ano=1899
```

### Filtrar por disponibilidade

```http
GET /livros?disponivel=true
```

### Combinar filtros

Os filtros podem ser utilizados simultaneamente:

```http
GET /livros?titulo=dom&disponivel=true
```

## Paginação

A listagem de livros também possui suporte à paginação.

Exemplo:

```http
GET /livros?page=1&limit=10
```

A resposta contém os dados encontrados e as informações da paginação:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

## Arquitetura

O projeto foi organizado seguindo uma separação de responsabilidades entre as diferentes camadas da aplicação:

```text
Requisição HTTP
      ↓
 Controller
      ↓
 Service
      ↓
 Repository
      ↓
 Sequelize
      ↓
 SQLite
```

### Controller

Responsável por receber as requisições HTTP, acessar parâmetros, chamar os Services e retornar as respostas.

### Service

Responsável pelas regras de negócio e pela coordenação das operações realizadas pela aplicação.

### Repository

Responsável pelo acesso aos dados e pela execução das operações utilizando o Sequelize.

### Models

Representam as entidades da aplicação e definem seus campos, tipos, validações e relacionamentos.

## Validações e restrições

Os Models utilizam recursos do Sequelize para definir regras como:

* Campos obrigatórios;
* Campos únicos;
* Chave primária;
* Valor padrão para disponibilidade dos livros;
* Validação do formato de e-mail dos autores.

## Objetivo da atividade

O projeto tem como objetivo aplicar, na prática, os conceitos de desenvolvimento de uma API REST utilizando Node.js, Sequelize e SQLite, incluindo configuração do banco de dados, criação de Models, validações, operações CRUD, relacionamentos, consultas com `include`, filtros, paginação e organização do código.

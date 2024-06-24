# Tech Challenge 02 - FIAP Blog

## Grupo 14 - Membros
- RM353230 Anelise Estevam
- RM355290 Anderson da Silva Machado 
- RM354725 Gustavo Fonseca
- RM354782 João Pedro Sanches Luciano 

## Data de entrega
- 30/04/2024

## Requisitos
### Funcionais
Os seguintes endpoints REST serão implementados para a aplicação de blogging:

- [X] GET `/posts` - Lista de Posts:
  - Este endpoint permitirá aos alunos visualizarem uma lista de todos os posts disponíveis na página principal.
- [X] GET `/posts/:id` - Leitura de Posts:
  - Ao acessar este endpoint com um ID específico de post, os alunos poderão ler o conteúdo completo desse post.
- [X] POST `/posts` - Criação de Postagens:
  - Permite que professores criem novas postagens. Este endpoint aceitará dados como título, conteúdo e autor no corpo da requisição.
- [X] PUT `/posts/:id` - Edição de Postagens:
  - Usado para editar uma postagem existente. Professores deverão fornecer o ID do post que desejam editar e os novos dados no corpo da requisição.
- [X] GET `/posts/admin` - Listagem de Todas as Postagens (Visão Administrativa):
  - Este endpoint permitirá que professores vejam todas as postagens criadas, facilitando a gestão do conteúdo.
- [X] DELETE `/posts/:id` - Exclusão de Postagens:
  - Permite que professores excluam uma postagem específica, usando o ID do post como parâmetro.
- [X] GET `/posts/search` - Busca de Posts:
  - Este endpoint permitirá a busca de posts por palavras-chave. Os usuários poderão passar uma query string com o termo de busca e o sistema retornará uma lista de posts que contêm esse termo no título ou conteúdo.

## Técnicos
- [X] Back-end em Node.js:
- [X] Implementação do servidor usando Node.js.
- [X] Utilização de frameworks como Express para roteamento e middleware.
- [X] Persistência de Dados:
  - [X] Utilização de um sistema de banco de dados (por exemplo, MongoDB, PostgreSQL).
- [X] Implementação de modelos de dados adequados para as postagens.
- [ ] Containerização com Docker:
  - [ ] Desenvolvimento e implantação usando contêineres Docker para garantir consistência entre ambientes de desenvolvimento e produção.
- [ ] Automação com GitHub Actions:
  - [ ] Configuração de workflows de CI/CD para automação de testes e deploy.
- [ ] Documentação:
  - [ ] Documentação técnica detalhada do projeto, incluindo setup inicial, arquitetura da aplicação e guia de uso das APIs.
- [ ] Cobertura de Testes:
  - [ ] O projeto deve garantir que pelo menos 30% do código seja coberto por testes unitários. Essa medida é essencial para assegurar a qualidade e a estabilidade do código, especialmente em funções críticas como criação, edição e exclusão de postagens.
- [ ] **Todos os endpoints que modificam dados (POST, PUT, DELETE) devem incluir autenticação e autorização adequadas para garantir que apenas usuários autorizados (professores) possam realizar essas operações.**

<aside>
💡 No front-end gostaria recomendo utilizar o `Handlebars` ao invés de usar a versão padrão
</aside>

## Entrega

- [ ] Código-Fonte: repositório GitHub com o código do projeto, incluindo Dockerfiles e scripts de CI/CD.
- [ ] Apresentação Gravada: demonstração em vídeo do funcionamento da aplicação, incluindo detalhes técnicos de implementação.
- [ ] Documentação: documento descrevendo a arquitetura do sistema, uso da aplicação e relato de experiências e desafios enfrentados pela equipe durante o desenvolvimento.

---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

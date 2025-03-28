# Users No-Express API

**Users No-Express API** é uma aplicação de exemplo que implementa uma API RESTful para gerenciamento de usuários sem o uso de frameworks como Express.js. O objetivo é demonstrar como criar uma API utilizando apenas os módulos nativos do Node.js.

## Estrutura

O projeto está estruturado nos seguintes arquivos principais:

- **server.js**: Configura o servidor HTTP e define a porta onde a aplicação será executada.
- **routes/userRoutes.js**: Gerencia as rotas relacionadas aos usuários, delegando as requisições para os controladores apropriados.
- **controllers/userController.js**: Contém a lógica de manipulação de dados, como criação, leitura, atualização e exclusão de usuários.
- **models/userModel.js**: Simula um banco de dados em memória e fornece funções auxiliares, como a geração de IDs.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js**: Para criar o servidor HTTP e gerenciar as requisições.
- **JavaScript (ES6)**: Para a implementação da lógica da aplicação.
- **Módulos Nativos do Node.js:**: Como `http` e `url` para manipulação de requisições e rotas.

## Pré-requisitos

Para rodar a aplicação localmente, você precisará ter o Node.js instalado em sua máquina. Não há dependências externas, já que o projeto utiliza apenas os módulos nativos do Node.js.

## Rodando Localmente

Para executar o projeto localmente, siga estas etapas:

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/hiago19/users-noexpress-api.git
   ```
2. Navegue até o diretório do projeto:

   ```bash
   cd users-noexpress-api
   ```
3. Inicie o servidor:

   ```bash
   node server.js
   ```
4. Acesse a API em `http://localhost:3000`.

## Funcionalidades

- **Listar Usuários**:
  - Endpoint: `GET /users`
  - Retorna todos os usuários ou filtra por parâmetros como `id`, `nome`, `sobrenome` e `idade`.
- **Buscar Usuário por ID**:
  - Endpoint: `GET /user`
  - Requer o parâmetro `id` na query string.
- **Criar Usuário**:
  - Endpoint: `POST /user`
  - Requer um corpo JSON com os campos `nome`, `sobrenome` e `idade`.
- **Atualizar Usuário**:
  - Endpoint: `PUT /user`
  - Requer o parâmetro `id` na query string e um corpo JSON com os campos a serem atualizados.
- **Deletar Usuário**:
  - Endpoint: `DELETE /user`
  - Requer o parâmetro `id` na query string.

## Demonstração

Aqui está uma captura de tela da API em execução:

1. **Listar Usuários**:
   ![Listar Usuários](https://github.com/user-attachments/assets/1bfee359-3dd1-42d7-8c0b-66e6aae1edc7)
2. **Buscar Usuário por ID**:
   ![Buscar Usuário por ID](https://github.com/user-attachments/assets/657a53ed-7086-403b-8688-e02f0a091ff4)
3. **Criar Usuário**:
   ![Criar Usuário](https://github.com/user-attachments/assets/f0b9d9c6-90d0-4a88-862c-fdc6ae1de2ac)
4. **Atualizar Usuário**:
   ![Atualizar Usuário](https://github.com/user-attachments/assets/31f207a6-54d5-4d73-b308-8a6a8f26f539)
5. **Deletar Usuário**:
   ![Deletar Usuário](https://github.com/user-attachments/assets/b23994e0-6da6-497b-bbe5-9409fa420da6)

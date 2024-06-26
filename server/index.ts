import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { Sequelize } from 'sequelize';

const app = express();
const port = 4000;

// Configuração do Sequelize para conectar ao MySQL
const sequelize = new Sequelize('mysql://user:password@localhost:3306/gajyun');

// Definição do esquema GraphQL
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Resolvers
const root = {
  hello: () => 'Hello world!',
};

// Middleware do GraphQL
app.use('/graphql', createHandler({ schema, rootValue: root }));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

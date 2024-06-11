/*
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configuração do pool de conexão
const pool = new Pool({
  host: 'localhost',
  database: 'fiap_blog',
  user: 'root',
  password: 'root',
  port: 5432, 
});
*/

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco de dados usando Sequelize
const sequelize = new Sequelize('fiap_blog', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Porta do PostgreSQL
});

// Teste a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;

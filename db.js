require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configuração do pool de conexão
const pool = new Pool({
  user: 'fiap_blog',
  host: 'localhost',
  database: 'root',
  password: 'root',
  port: 5432, 
});

module.exports = pool;

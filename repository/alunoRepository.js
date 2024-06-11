const pool = require('../sequelize');
const model = require('../models/Post');

const getAllAvisos = async () => {
  const result = await model.query('SELECT id, titulo, conteudo FROM Post');
  return result.rows;
};

module.exports = {
  getAllAvisos,
};

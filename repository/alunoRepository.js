const sequelize = require('../config/sequelize');
const Post = require('../models/Post'); // Importe o modelo Post corretamente

const getAllAvisos = async () => {
  try {
    const avisos = await Post.findAll({
      attributes: ['id', 'titulo', 'conteudo'], // Especifique apenas os atributos desejados
    });
    return avisos;
  } catch (error) {
    console.error("Error fetching avisos:", error);
    throw error;
  }
};

module.exports = {
  getAllAvisos,
};

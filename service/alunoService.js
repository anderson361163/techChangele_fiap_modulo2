const alunoRepository = require('../repository/alunoRepository');

const getAllAvisos = async () => {
  return await alunoRepository.getAllAvisos();
};

module.exports = {
  getAllAvisos,
};

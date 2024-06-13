const alunoRepository = require('../repository/alunoRepository');

const getAllPost = async () => {
  try {
    return await alunoRepository.getAllPost(); // Utiliza a função getAllPost do repository
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const createAviso = async (titulo, conteudo) => {
  try {
    return await alunoRepository.postPost(titulo, conteudo); // Utiliza a função postPost do repository
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

const updateAviso = async (postId, titulo, conteudo) => {
  try {
    return await alunoRepository.putPost(postId, titulo, conteudo); // Utiliza a função putPost do repository
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

const getAvisoById = async (postId) => {
  try {
    return await alunoRepository.getIdPost(postId); // Utiliza a função getIdPost do repository
  } catch (error) {
    console.error(`Error fetching post with id ${postId}:`, error);
    throw error;
  }
};

const deleteAviso = async (postId) => {
  try {
    return await alunoRepository.deletePost(postId); // Utiliza a função deletePost do repository
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

module.exports = {
  getAllPost,
  createAviso,
  updateAviso,
  getAvisoById,
  deleteAviso
};

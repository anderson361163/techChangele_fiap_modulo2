const sequelize = require('../config/sequelize');
const Post = require('../models/Post'); // Importe o modelo Post corretamente

// Operação READ (getAllPost): Retorna todos os registros da tabela Posts
const getAllPost = async () => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'titulo', 'conteudo'], // Especifique apenas os atributos desejados
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Operação CREATE (postPost): Cria um novo registro na tabela Posts
const postPost = async (titulo, conteudo) => {
  try {
    const newPost = await Post.create({
      titulo,
      conteudo,
    });
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Operação UPDATE (putPost): Atualiza um registro existente na tabela Posts
const putPost = async (postId, titulo, conteudo) => {
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    
    // Atualiza apenas se os novos valores forem diferentes dos atuais
    if (titulo !== post.titulo || conteudo !== post.conteudo) {
      post.titulo = titulo;
      post.conteudo = conteudo;
      await post.save();
    }
    
    return post;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Operação READ by ID (getIdPost): Retorna um registro da tabela Posts baseado no ID
const getIdPost = async (postId) => {
  try {
    const post = await Post.findByPk(postId, {
      attributes: ['id', 'titulo', 'conteudo'],
    });
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  } catch (error) {
    console.error(`Error fetching post with id ${postId}:`, error);
    throw error;
  }
};

// Operação DELETE (deletePost): Deleta um registro da tabela Posts baseado no ID
const deletePost = async (postId) => {
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    await post.destroy();
    return post;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

module.exports = {
  getAllPost,
  postPost,
  putPost,
  getIdPost,
  deletePost
};

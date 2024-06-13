var express = require('express');
var router = express.Router();
const postService = require('../service/alunoService');

/* GET listagem de posts. */
router.get('/admin', async function(req, res, next) {
  try {
    const avisos = await postService.getAllPost();
    const data = {
      posts: avisos
    };
    res.render('partials/professor/lista/lista', 
      {
       ...data,
       title: 'Fiap Blog' 
      });
  } catch (error) {
    console.error("Error fetching posts:", error);
    next(error);
  }
});

/* POST criação de um novo post. */
router.post('/admin', async function(req, res, next) {
  const { titulo, conteudo } = req.body;
  try {
    await postService.createAviso(titulo, conteudo);
    const avisos = await postService.getAllPost();
    const data = {
      posts: avisos
    };
    res.render('partials/professor/lista/lista', 
      {
       ...data,
       title: 'Fiap Blog' 
      });
  } catch (error) {
    console.error("Error creating post:", error);
    next(error);
  }
});

/* PUT atualização de um post existente. */
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { titulo, conteudo } = req.body;
  try {
    await postService.updateAviso(id, titulo, conteudo);

    const avisos = await postService.getAllPost();
    const data = {
      posts: avisos
    };
    res.render('partials/professor/lista/lista', 
      {
       ...data,
       title: 'Fiap Blog' 
      });

    res.render('partials/professor/lista/lista', { posts, title: 'Fiap Blog' });
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    next(error);
  }
});

/* DELETE exclusão de um post existente. */
router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    await postService.deleteAviso(id);
    
    const avisos = await postService.getAllPost();
    const data = {
      posts: avisos
    };
    res.render('partials/professor/lista/lista', 
      {
       ...data,
       title: 'Fiap Blog' 
      });

    res.render('partials/professor/lista/lista', { posts, title: 'Fiap Blog' });
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    next(error);
  }
});

module.exports = router;

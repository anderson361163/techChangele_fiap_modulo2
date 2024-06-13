var express = require('express');
var router = express.Router();
const alunoService = require('../service/alunoService');

router.get('/', async function(req, res, next) {

  try {
    const avisos = await alunoService.getAllPost();
    const data = {
      posts: avisos
    };
    res.render('partials/aluno/lista/lista', {
      ...data,
      title: 'Fiap Blog',
    });
  } catch (err) {
    next(err);
  }

});


module.exports = router;

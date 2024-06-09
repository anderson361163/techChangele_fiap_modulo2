var express = require('express');
var router = express.Router();
const alunoService = require('../service/alunoService');


const links = {
  links: [
    { href: '/', text: 'Inicio' },
    { href: '/', text: 'Link 2' }
  ]
};

const data = {
  people: [
    { id: 1, titulo: "Aviso 1", conteudo: "Mensagem 1" },
    { id: 2, titulo: "Aviso 2", conteudo: "Mensagem 2" },
    { id: 3, titulo: "Aviso 3", conteudo: "Mensagem 3"}
  ]
};


router.get('/', async function(req, res, next) {

  try {
    const avisos = await alunoService.getAllAvisos();
    const data = {
      people: avisos
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

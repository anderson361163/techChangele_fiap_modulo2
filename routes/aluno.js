var express = require('express');
var router = express.Router();
const connection = require('../db');

const links = {
  links: [
    { href: '/', text: 'Inicio' },
    { href: '/', text: 'Link 2' }
  ]
};

const data = {
  people: [
      { titulo: "Aviso 1", conteudo: "Mensagem 1" },
      { titulo: "Aviso 2", conteudo: "Mensagem 2" },
      { titulo: "Aviso 3", conteudo: "Mensagem 3"}
  ]
};


router.get('/', function(req, res, next) {
  res.render('partials/aluno/lista/lista', 
    { 
      //...links,
      ...data,
      title: 'Fiap Blog',
    }
    );
});


module.exports = router;

var express = require('express');
var router = express.Router();


const data = {
  people: [
      { titulo: "Aviso 1", conteudo: "Mensagem 1" },
      { titulo: "Aviso 2", conteudo: "Mensagem 2" },
      { titulo: "Aviso 3", conteudo: "Mensagem 3"}
  ]
};

/* GET users listing. */
router.get('/admin', function(req, res, next) {
  res.render('partials/professor/lista/lista', 
    { 
      ...data,
      title: 'Fiap Blog',
    }
    );
});

router.get('search',function(req, res, next) {
  res.render('partials/professor/lista/lista', 
    { 
      //...links,
      title: 'Fiap Blog',
    }
    );
});

router.put(':id', function(req, res, next) {
  res.render('partials/professor/lista/lista', 
    { 
      //...links,
      title: 'Fiap Blog',
    }
    );
});

router.delete(':id', function(req, res, next) {
  res.render('partials/professor/lista/lista', 
    { 
      //...links,
      title: 'Fiap Blog',
    }
    );
});


module.exports = router;

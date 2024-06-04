var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/professor/inicio', function(req, res, next) {
  res.render('login', 
    { 
      ...links,
      title: 'Fiap Blog',
    }
    );
});

module.exports = router;

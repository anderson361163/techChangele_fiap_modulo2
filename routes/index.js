var express = require('express');
var router = express.Router();
const connection = require('../db');

const links = {
  links: [
    { href: '/', text: 'Inicio' },
    { href: '/lista', text: 'Link 2' }
  ]
};

const data = {
  people: [
      { name: "John Doe", age: 25, city: "New York" },
      { name: "Jane Smith", age: 30, city: "San Francisco" },
      { name: "Michael Johnson", age: 35, city: "Los Angeles" }
  ]
};

router.get('/', function(req, res, next) {
  res.render('partials/lista/lista', 
    { 
      ...links,
      ...data,
      title: 'Fiap Blog',
    }   
    );
});

router.get('/lista', function(req, res, next) {
  res.render('login', 
    { 
      ...links,
      title: 'Fiap Blog',
    }
    );
});


module.exports = router;

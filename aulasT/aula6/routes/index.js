var express = require('express');
var router = express.Router();
var Lista = require('../controllers/compra')

router.get('/api/listas', function(req, res, next) {
  Lista.list()
    .then (dados=> 
      res.jsonp(dados)
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});

router.get('/api/listas/:id', function(req, res, next) {
  Lista.getLista(req.params.id)
    .then(dados => {
      res.jsonp(dados);
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});

router.get('/api/categorias', function(req, res, next) {
  Lista.categorias()
    .then(dados => {
      res.jsonp(dados);
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});

router.get('/api/categorias/id', function(req, res, next) {
  Lista.prodsbyCat(req.params.id)
    .then(dados => {
      res.jsonp(dados);
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});

module.exports = router;



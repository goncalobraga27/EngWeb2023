var express = require('express');
var router = express.Router();
var env = require('../config/env');
var axios = require('axios');
/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,19)
  axios.get(env.api+'/listas')
    .then(response => {
      res.render('index', { lists: response.data,d: date});
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});
router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0,19)
  axios.get(env.api+'/listas/'+ req.params.id)
    .then(response => {
      res.render('shopList', { list: response.data,d: date});
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});

module.exports = router;

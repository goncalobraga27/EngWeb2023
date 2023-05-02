var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Na cb da homepage')
  console.log(req.sessionID)
  res.render('index');
});

// Login Page 
router.get('/login', function(req, res, next) {
  console.log('Na cb da GET login..')
  console.log(req.sessionID)
  res.render('loginForm');
});

router.post('/login', function(req, res, next) {
  console.log('Na cb da POST login..')
  console.log(req.body)
  res.send('Login Recebido e tratado ...')
});

module.exports = router;

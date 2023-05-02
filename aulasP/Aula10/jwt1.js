var jwt = require('jsonwebtoken');
try{
    var token = jwt.sign(
        {username: 'jcr',level :'editor'},
        'EngWeb2023',
        {expiresIn:100});
    console.log('Token: '+token);
}
catch{
    console.log('Erro no programa')
}
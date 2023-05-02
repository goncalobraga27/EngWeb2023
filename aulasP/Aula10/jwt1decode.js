var jwt = require('jsonwebtoken');
var token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpjciIsImxldmVsIjoiZWRpdG9yIiwiaWF0IjoxNjgyNTAzODgzLCJleHAiOjE2ODI1MDM5ODN9.6H_7MX86rV6BF9qKcMA5sK-KSHPuA-jAYxOpOXqjeBc'
jwt.verify(token,'EngWeb2023',function(e,payload){
    if(e) console.log('Erro na verificação do token:'+e);
    else console.log('Payload:'+JSON.stringify(payload));
})
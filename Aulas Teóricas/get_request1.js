const axios = require('axios')

axios.post('http://localhost:3000/pessoas',{
    id: '112',
    CC:'12345',
    nome:'Maria José'
    })
    .then(function(resp){
        console.log(resp.status)
    })
    .catch(erro => {
        console.log("Erro: "+ erro)
    })
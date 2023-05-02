var mongoose = require ('mongoose')

var mongoDB='mongodb://127.0.0.1/world';

mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true});

var db = mongoose.connection;

db.on('error',console.error.bind(console,"MongoDB connection error ..."));

db.once('open',function(){
    console.log('Conexão ao MongoDB realizada com sucesso ...')

    var studentSchema= new mongoose.Schema({
        _id:String,
        nome:String,
        gitlink:String,
        tpc1:String,
        tpc2:String,
        tpc3:String,
        tpc4:String,
        tpc5:String,
        tpc6:String,
        tpc7:String,
        tpc8:String
    });

    var studentModel=mongoose.model('student',studentSchema)

    var students=[
        {
            "nome":"Ana Dias",
            "_id":"A111"
        }
    ]
    studentModel.create(students)

    console.log("Tudo bem")

})


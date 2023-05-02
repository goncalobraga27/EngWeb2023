var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var fs = require('fs');
var multer = require('multer')
var upload = multer({ dest: 'uploads'});

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,19)
  jsonfile.readFile(__dirname+'/../data/dbFiles.json',(err, fileList)=>{
    if(err){
      res.render('error', {error: err});
    }
    else{
      res.render('index', { files: fileList,d:date });
    }
  })
});

/* File submission */
router.post('/files',upload.single('myfile'), (req, res) =>{
  console.log('cdir:'+__dirname)
  let oldPath = __dirname+'/../'+req.file.path
  console.log('old: '+oldPath)
  let newPath = __dirname +'/../public/fileStore/'+req.file.originalname
  console.log('new: '+newPath)
  fs.rename(oldPath,newPath,(err)=>{
    if (err) throw err
  })
  var d = new Date().toISOString().substring(0,19)
  var files = jsonfile.readFileSync(__dirname+'/../data/dbFiles.json')
  files.push({
    date:d,
    name:req.file.originalname,
    mimetype:req.file.mimetype,
    size:req.file.size
  })
  jsonfile.writeFileSync(__dirname+'/../data/dbFiles.json',files)
  res.redirect('/')
})
/* Download*/
router.get('/download/:fname', function(req, res, next) {
  res.download(__dirname+'/../public/fileStore/'+req.params.fname);
});
/* File Content */
router.get('/fileContents/:fname', function(req, res, next) {
  var contents = jsonfile.readFileSync(__dirname+'/../public/fileStore/'+req.params.fname)
  res.json(contents);
});
module.exports = router;

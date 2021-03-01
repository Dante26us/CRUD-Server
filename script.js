var express = require('express');
var cors=require('cors');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
const { send } = require('process');

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/listCharacters", function (req, res) {
  fs.readFile(__dirname + "/" + "characters.json", "utf8", function (err,data) {
    console.log(data);
    res.end(data);
  });
});
app.get('/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "characters.json", 'utf8', function (err, data) {
     var heroes = JSON.parse( data );
     var charid=req.params.id;
     var charactr = heroes.characterDetails[charid];
     console.log( charactr );
     res.end( JSON.stringify(charactr));
  });
})


app.post("/addCharacter",function (req, res) {
  
  //console.log(req.body);
  //res.send(req.body);
  fs.readFile( __dirname + "/" + "characters.json", 'utf8', function (err, data) 
  {
    var obj = JSON.parse( data );
    obj['characterDetails'].push(req.body);
    //data=JSON.stringify(obj);
    //console.log(obj);
    processFile(obj);
    res.send(obj);
  });
  function processFile(obj){
    console.log(obj);
    //fs.writeFile(__dirname+"/"+"characters.json",obj,'utf8',function(err){
    // console.log(err);  })
    fs.writeFileSync(__dirname + "/" + "characters.json",JSON.stringify(obj,null,2)); 
  
  }
  
})
app.delete("/deleteCharacter", function (req, res) {
  fs.readFile(__dirname + "/" + "characters.json", "utf8", function ( err, data) 
  {
    data = JSON.parse(data);
    console.log(req.body);
    data['characterDetails'].splice((req.body.newChar)-1,1);
    //console.log(data);
    processFile(data);
    res.send(JSON.stringify(data));
  });
  function processFile(data){
    console.log(data);
    //fs.writeFile(__dirname+"/"+"characters.json",obj,'utf8',function(err){
    // console.log(err);  })
    fs.writeFileSync(__dirname + "/" + "characters.json",JSON.stringify(data,null,2)); 
  
  }

});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  //console.log(host)
  console.log("Example app listening at http://%s:%s",host,port);
});


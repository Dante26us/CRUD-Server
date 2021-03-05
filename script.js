var express = require('express');
var cors=require('cors');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
const { send } = require('process');
const CharacterModel=require("./models/char.js")


app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


mongoose.connect('mongodb+srv://new_user:nodeApi@crud.2ozfb.mongodb.net/characters?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useUnifiedTopology: true 
});

app.get('/:charId',async (req, res)=> {
  var chId=req.params.charId;
  //console.log(chId);
  CharacterModel.findOne({characterId: chId},(err,result)=>{
    //console.log(result)   
    if(err){     
      res.send(err);
    }
   res.send(result);
  })
});

app.post("/addCharacter",async (req,res) =>{
  const newChar={
    'name':req.body.name,
    'gender':req.body.gender,
    'movie':req.body.movie,
    'actor':req.body.actor,
    'characterId':req.body.characterId
  };
  console.log(newChar)
  const char=new CharacterModel(newChar);
  try{
    await char.save();
    console.log('saved data');
    res.send(JSON.stringify(char));
  }
  catch(err){
    console.log(err);
  }
});

app.delete("/deleteCharacter",async (req,res)=>{
  var chId=req.body.newChar;
  console.log(chId);
  await CharacterModel.findOneAndDelete({characterId: chId},(err,result)=>{
    if(err){     
      res.send(err);
    }
   res.send(result);
  })
});
  

 app.listen(8080, () => {
  console.log("Example app listening at 8080");
});

/*fs.readFile(__dirname + "/" + "characters.json", "utf8", function (err,data) {
    console.log(data);
    res.end(data);
  });
});
app.get('/:id',async function (req, res) {
  
  fs.readFile( __dirname + "/" + "characters.json", 'utf8', function (err, data) {
     var heroes = JSON.parse( data );
     var charid=req.params.id;
     var charactr = heroes.characterDetails[charid];
     console.log( charactr );
     res.end( JSON.stringify(charactr));
  });
  const character=new CharacterModel({
    name : "Luke Skywalker",
    gender: "Male",
    movie: "Star Wars",
    actor: "Mark Hamill"
      
  });/*
  try{
    await character.save();
  }
  catch(err){
    console.log(err);
  }

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

});*/
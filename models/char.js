const mongoose=require('mongoose');

const CharacterSchema= new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    gender: {
        type : String,
        required : true,
    },
    movie: {
        type : String,
        required : true,
    },
    actor: {
        type : String,
        required : true,
    },
    characterId: {
        type : String,
        required : true,
    },
});

const char=mongoose.model("CharacterData",CharacterSchema)
module.exports=char
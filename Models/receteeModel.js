const mongose=require("mongoose");
const recetteSchema=new mongose.Schema({
    name:String,
    ingredients:String,
    tempsPreparation:Number,
});
module.exports=mongose.model("recette",recetteSchema);
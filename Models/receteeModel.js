const mongose=require("mongoose");
const recetteSchema=new mongose.Schema({
    name:{type:String},
    ingredients:[{type:String}],
    tempsPreparation:{type:Number},
    chef:{type:mongose.Schema.Types.ObjectId,ref:"chef"}
});
module.exports=mongose.model("recette",recetteSchema);
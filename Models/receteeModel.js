const mongose=require("mongoose");
const recetteSchema=new mongose.Schema({
    name:{type:String},
    ingredients:[{type:String}],
    tempsPreparation:{type:Number},
    restaurant:{type:mongose.Schema.Types.ObjectId,ref:"restaurant"}
});
module.exports=mongose.model("recette",recetteSchema);
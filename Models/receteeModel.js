const mongose=require("mongoose");
const recetteSchema=new mongose.Schema({
    name:String,
    ingredients:String,
    tempsPreparation:Number,
    chef:{type:mongose.Schema.Types.ObjectId,ref:chef,required:true}
});
module.exports=mongose.model("recette",recetteSchema);
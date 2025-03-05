const mongose=require("mongoose");
const RecetteSchema=new mongose.Schema({
    libelle:{type:String},
});
module.exports=mongose.model("recettes",RecetteSchema);
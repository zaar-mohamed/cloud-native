const mongose=require("mongoose");
const livreSchema=mongose.Schema({
    titre:String,
    editeur:String,
    annePub:Date,
    category:String,
    disponible:Boolean
});
module.exports=mongose.model("livres",livreSchema);
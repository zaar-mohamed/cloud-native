const mongose=require("mongoose");
const ChefSchema=new mongose.Schema({
    nom:{type:String},
    specialite:{type:String}
})
module.exports=mongose.model("chefs",ChefSchema)

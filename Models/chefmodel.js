const mongose=require("mongoose");
const chefScheme=new mongose.Schema({
    name:String,
    foodSpecialite:String,
    restaurant:String
});
module.exports=mongose.model("chef",chefScheme);
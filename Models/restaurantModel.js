const mongose=require("mongoose");
const restaurantSchema=new mongose.Schema({
    id:Number,
    name:String,
    city:String
    
});
module.exports=mongose.model("restaurant",restaurantSchema);
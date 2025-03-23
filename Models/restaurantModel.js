const mongose=require("mongoose");

const restaurantSchema=new mongose.Schema({
    name:{type: String},
    category:{type: String},
    ouverture:{type: Number},
    chef:[{type:mongose.Schema.Types.ObjectId,ref:"chef"}],
    reccettes:[{type:mongose.Schema.Types.ObjectId,ref:"recette"}],
    
});
module.exports=mongose.model("restaurant",restaurantSchema);
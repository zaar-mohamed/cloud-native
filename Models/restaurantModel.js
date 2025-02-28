const mongose=require("mongoose");
const restaurantSchema=new mongose.Schema({
    
    name:String,
    category:String,
    chef:{type:mongose.Schema.Types.ObjectId,ref:"chef",required:true},
    reccettes:{type:mongose.Schema.Types.ObjectId,ref:"recette",required:true},
    
});
module.exports=mongose.model("restaurant",restaurantSchema);
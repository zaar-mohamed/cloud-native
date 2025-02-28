const mongose=require("mongoose");
const chefScheme=new mongose.Schema({
    name : {String,required:true},
    foodSpecialite:[{String,required:true}],
    restaurant:{type:mongose.Schema.Types.ObjectId,ref:"restaurant",required:true},

});
module.exports=mongose.model("chef",chefScheme);
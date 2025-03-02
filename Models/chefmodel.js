const mongose=require("mongoose");
const chefSchema=new mongose.Schema({
    name:{type:String},
    foodSpecialite:[{type:String}],
    restaurant:{type:mongose.Schema.Types.ObjectId,ref:"restaurant"},

});
module.exports=mongose.model("chef",chefSchema);
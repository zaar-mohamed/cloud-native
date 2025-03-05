const mongose=require("mongoose");
const RestaurantSchema=new mongose.Schema({
    nom:{type:String},
    chef_id:{type:mongose.Schema.Types.ObjectId,ref:"chefs"},
    recette_id:{type:mongose.Schema.Types.ObjectId,ref:"recettes"}
})
module.exports=mongose.model("restaurants",RestaurantSchema)
const mongose=require("mongoose");
const recette=new mongose.Schema({
    name:"recette de pizza",
    ingredients:["tomate","mozzarella"],
    tempsPreparation:30
});
module.exports=mongose.model("recette",recette);
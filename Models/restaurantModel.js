const mongose=require("mongoose");
const restaurant=new mongose.Schema({
    id:1,
    name:"el pescador",
    city:"malaga",
    
});
module.exports=mongose.model("restaurant",restaurant);
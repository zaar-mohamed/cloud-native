const mongose=require("mongoose");
const chef=new mongose.Schema({
    name:"zaar mohamed",
    foodSpecialite:["morrocan","spanish"],
    restaurant:"el pescador"
});
module.exports=mongose.model("chef",chef);
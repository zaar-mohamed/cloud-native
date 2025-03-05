const mongose=require("mongoose");
const UserSchema=new mongose.Schema({
    nom:{type:String},
    email:{type:String},
    login:{type:String},
    mdp:{type:String}
})
module.exports=mongose.model("users",UserSchema);
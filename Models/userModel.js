const mongose=require("mongoose")
const userSchema=new mongose.Schema({
    nom:{type:String,minlength:5},
    prenom:{type:String,minlength:5},
    email:{type:String,required:true,unique:true},
    mdp:{type:String}
});
module.exports=mongose.model("User",userSchema);
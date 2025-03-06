const express=require("express");
const router=express.Router();
const users=require("./UtilisateurModel");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
router.get("/all",(req,res)=>{
    const alluser=users.find({})
    if(alluser){
        res.json(alluser);

    }
    else{
        res.status(404).send("users not found")
    }
});
router.post("/register",async(req,res)=>{
    const hassedpaas=await bcrypt.hash(req.body.mdp,10);
    const newuser=await new users({
        nom:req.body.nom,
        email:req.body.email,
        login:req.body.login,
        mdp:hassedpaas
    });
    if(!req.body.email || !req.body.mdp){
       return res.send("email and pasword are required")
    }
    const userexisting=users.findOne({email:req.body.email,login:req.body.login});
    if(userexisting){
        res.send("user already exists");
    }
   await  newuser.save();
    res.send("user added succesfullly")
});
router.post("/login",(req,res)=>{
    const {email,mdp}=req.body;
    if(!email || !mdp ){
        return res.status(403).send("email and passsword are required")
    }
   
    const user=users.findOne({email:email})
    if(!user){
        return res.status(404).send("user not found")
    }
    passwordvalidation=bcrypt.compare(mdp,user.mdp);
    if(!passwordvalidation){
        return res.send("wrong password")
    }
    const token=jwt.sign({email},"tokenkey");
    res.json({token});
    res.send("login success")
})
module.exports=router;
const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const Users=require("../Models/userModel");

router.post("/login",async(req,res)=>{
    const {email,mdp}=req.body;
    try{
        if(!email || !mdp){
           return res.status(401).send("email and password required");
        }
        const user=await Users.findOne({email:email});
        if(!user){
           return res.send("No user Found");
        }
        const pwdvalid=await bcrypt.compare(mdp,user.mdp);
        if(!pwdvalid){
            return res.status(400).send("password invalid");
        }

        const token=jwt.sign({email},"tokenKey");
        res.json({token:token});

    }
    catch(eror){
        res.status(401).send("user not authorized")
    }
});



router.post("/register",async(req,res)=>{
    const hashedpassword=await bcrypt.hash(req.body.mdp,10);
    const newuser=new Users({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        mdp:hashedpassword
        })
        if (!req.body.email || !req.body.mdp) {
            return res.status(401).send("email et mot de passe obligatoire");
          }
    const userExisting=await Users.findOne({email:req.body.email});
    if(userExisting){
        res.status(401).send("User already exists")
    }
    else{
        await newuser.save();
        res.status(200).send("User added successfully")
    }
})

module.exports=router;
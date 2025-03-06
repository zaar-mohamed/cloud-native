const express=require("express");
const jwt=require("jsonwebtoken");


function verifytoken(req,res,next){
    const token=req.headers.authorization && req.headers.authorization.split(" ")[1];
    if(!token){
        res.status(403).send("token is required for authentication")
    }
    jwt.verify(token,"tokenkey",(eror,user)=>{
        if(eror){
            res.status(403).send("invalid token")
        }
        req.user=user;
        next();
    })
};
module.exports={verifytoken};
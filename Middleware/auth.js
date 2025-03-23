const jwt=require("jsonwebtoken");

function verifytoken(req,res,next){
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(403).send("token est obligatoire pour l'authentification");
    }
    jwt.verify(token,"tokenKey",(err,user)=>{
        if(err){
            return res.status(401).send("token invalid")
        }
        req.user=user;
        next();
    })

}
module.exports={verifytoken}
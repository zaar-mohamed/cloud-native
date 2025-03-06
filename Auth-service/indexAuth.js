const express=require("express")
const app = express();
app.use(express.json());
const mongose=require("mongoose");
mongose.connect("mongodb://localhost:27017/TPMicroservice")
.then(console.log("connected to TPMicroservice"))
.catch(err=>console.log("error : ",err))

const jwt = require("jsonwebtoken");
// function verifytoken(req,res,next){
//     const token=req.headers.authorization && req.headers.authorization.split(" ")[1];
//     if(!token){
//         return res.status(403).send("token is required to authentify")
//     }
//     jwt.verify(token,"tokenkey",(err,user)=>{
//         if(err){
//             return res.status(403).send("invalid token")
//         }
//         req.user=user;
//         next();
//     })
// }



app.use("/authen",require("./Utilisateur"));


const port = 5432;
app.listen(port || 3000,()=>{
    console.log(`TPMicroservice running on port ${port}`);
});
const express=require("express")
const app = express();
app.use(express.json());
const middlware=require("../Chef/middlewre")
const mongose=require("mongoose");
const {verifytoken}=require("./middlewre")
mongose.connect("mongodb://localhost:27017/TPMicroservice")
.then(console.log("connected to TPMicroservice"))
.catch(err=>console.log("error : ",err))

app.use("/restaurants",verifytoken,require("./Restaurant"));



const port = 5432;
app.listen(port || 3000,()=>{
    console.log(`TPMicroservice running on port ${port}`);
})
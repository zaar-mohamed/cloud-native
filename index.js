const express=require("express");

const app=express();
app.listen(3000,()=>{
    console.log('listening to port 3000');
})
app.use(express.json());
require("dotenv").config();
const host =process.env.HOST;
var cors=require("cors");
app.use(cors());
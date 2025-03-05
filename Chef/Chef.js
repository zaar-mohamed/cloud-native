const express=require("express");
const router=express.Router();
const chefs=require("./ChefModel");

router.get("/all",async(req,res)=>{
    const allchefs= await chefs.find({});
    if(allchefs){
        res.json(allchefs);
    }
    else{
        res.status(404).send("chefs not found");
    }
})
module.exports=router;
const express=require("express");
const router=express.Router();
const restaurants=require("./RestaurantModel");

router.get("/all",async(req,res)=>{
    const allrestaurants= await restaurants.find({});
    if(allrestaurants){
        res.json(allrestaurants);
    }
    else{
        res.status(404).send("chefs not found");
    }
})
module.exports=router;
const express=require("express");
const router=express.Router();
const restaurant = require('../Models/restaurantModel');
router.get("restaurants",(req,res)=>{
    const restaurants=restaurant.find({});
    res.send(restaurants)
})
module.exports = router;
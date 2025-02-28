const express=require("express");
const router=express.Router();
const chef = require('../Models/chefmodel');
router.get("chefs",(req,res)=>{
    const chefs=chef.find({});
    res.send(chefs)
})
module.exports = router;
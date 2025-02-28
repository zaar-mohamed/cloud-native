const express=require("express");
const router=express.Router();
const Chef = require('../Models/chefmodel');
router.get("chefs",(req,res)=>{
    const chefs=Chef.find({});
    res.send(chefs)
})
module.exports = router;
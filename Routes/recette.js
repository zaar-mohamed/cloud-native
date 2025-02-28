const express=require("express");
const router=express.Router();
const recette = require('../Models/receteeModel');
router.get("recettes",(req,res)=>{
    const recettes=recette.find({});
    res.send(recettes)
})
module.exports = router;
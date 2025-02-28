const express=require("express");
const router=express.Router();
const chefs = require('../Models/chefmodel');

// la recuperation de tous les chefs
router.get("/all",(req,res)=>{
    const chefs=chefs.find({});
    res.send(chefs)
});

// la recuperation des nomes des chefs
router.get("/names",async (req,res)=>{
    try{
        const chefs=await chefs.find({},'name');
        res.send(chefs)
    }
    catch(error){
        console.error("error :",error);
    }
});

// la creation d'un nouveau chef
router.post("/add",(req,res)=>{
    const newchef=new chefs(req.body);
    newchef.save();
    res.send("new chef added successfully");
})
// la recuperation des recettes d'un chef
router.get("/recette",(req,res)=>{
    
});

// la modification des données d'un chef
router.put("/update/:name",(req,res)=>{
    let nom=req.params.name;
    const chef=chefs.findOne({name:nom});
    if(chef){
        chefs.updateOne({name:nom},req.body)
        res.send("chef updated successfully");
    }
    else{
        res.send("chef not found");
    }
});

// la suppression d'un chef
router.delete("/delete/:name",(req,res)=>{
    let nom=req.params.name;
   let chef=chefs.findOne({name:nom});
    if(chef){
        chefs.deleteOne({name:nom})
        res.send("chef deleted successfully");
    }
    else{
        res.send("chef not found");
    }
}
)

module.exports = router;
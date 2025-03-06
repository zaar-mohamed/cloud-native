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
});
router.post("/add",async(req,res)=>{
    const newchef=await  chefs.insertMany(req.body);
    
     res.json(newchef)
    res.send("chef added successfully");
});

router.put("/update/:name",async(req,res)=>{
    const chefname=decodeURIComponent(req.params.name);
    const chef=await chefs.findOne({nom:chefname});
    if(chef){
        await  chefs.updateOne({nom:chefname},{$set:{nom:req.body.nom,specialite:req.body.specialite}});
        res.send("chef updated successfully");
    }
    else{
        res.send("chef not found")
    }
});
router.delete("/delete/:name",async(req,res)=>{
    const chefname= decodeURIComponent(req.params.name);
    const chef=await chefs.findOneAndDelete({nom:chefname});
    if(chef){
        res.send("chef deleted successfully");
    }
    else{
        res.send("chef not found");
    }
})

module.exports=router;
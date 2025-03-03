const express=require("express");
const router=express.Router();
const chefs = require('../Models/chefmodel');
const jwt=require("jsonwebtoken")


// Login using jwt
router.post("/login",async(req,res)=>{
    const {name:username}=req.body;
    
   try {const chef=await chefs.findOne({name:username});
    if(!chef){
        res.status(404).send("chef non trouvée")
    }
    
    
        const token=jwt.sign({username:chef.name},'secretkey');
        res.json({token:token})
    
}
    catch(error){
        console.error("error :",error);
    }
});



// la recuperation de tous les chefs
router.get("/all", async (req, res) => {
    try {
        const allChefs = await chefs.find({}); 
        if (allChefs) {
            res.status(200).json(allChefs); 
        } else {
            res.status(404).send("Aucun chef trouve");
        }
    } catch (error) {
        console.error("Error fetching chefs:", error);
        res.status(500).send("Server error");
    }
});


// la recuperation des nomes des chefs
router.get("/names",async (req,res)=>{
    try{
        const chefsnames=await chefs.find({},'name');
        res.send(chefsnames)
    }
    catch(error){
        console.error("error :",error);
    }
});

// la creation d'un nouveau chef
router.post("/add",(req,res)=>{
    const newchef=new chefs(req.body);
    try{newchef.save();
    res.json(newchef);
        res.send("new chef added successfully")
}
    catch(err){
        res.status(400).json({"error ":err})
    }
})
// la recuperation des recettes d'un chef
router.get("/recette",(req,res)=>{
    const chefrecette=chefs.aggregate([{
        $lookup:{
            from:"recette",
            localField:"_id",
            foreignField:"chef",
            as:"recettes"
        }
    }]);
    if(chefrecette){
        res.send(chefrecette);

    }
    else{
        res.send("recette not found");
    }
});

//la modification des données d'un chef
router.put("/update/:name",async(req,res)=>{
    let nom=decodeURIComponent(req.params.name);
    const chef=await chefs.findOne({name: nom});
    if(chef){
        await chefs.updateOne({name: nom},{ $set: req.body})
        res.send("chef updated successfully");
    }
    else{
        res.status(404).send("chef not found");
    }
});




// la suppression d'un chef
router.delete("/delete/:name",async(req,res)=>{
    let nom=decodeURIComponent(req.params.name);
   let chef=await chefs.findOne({name:nom});
    if(chef){
       await chefs.deleteOne({name:nom})

        res.send("chef deleted successfully");
    }
    else{
        res.send("chef not found");
    }
}
)

module.exports = router;
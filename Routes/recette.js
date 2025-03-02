const express=require("express");
const router=express.Router();
const recette = require('../Models/receteeModel');

// la recuperation de toutes les recettes;
router.get("/all", async (req, res) => {
    try {
        const allrecettes = await recette.find({}); 
        if (allrecettes.length > 0) {
            res.json(allrecettes); 
        } else {
            res.status(404).send("Aucun recette trouvé");
        }
    } catch (error) {
        console.error("Error fetching recettes:", error);
        res.status(500).send("Server error");
    }
});
// la recuperation des nomes de recettes;
router.get("/names",async(req,res)=>{
    const recettes=await recette.find({},"name")
    if(recettes){
        res.send(recettes)
    }
    else{
        res.status(404).send("Aucune recette trouvée")
    }
});

//l'ajoute d'un recette;
router.post("/add",(req,res)=>{
    const newRecette=new recette(req.body);
    try{
        newRecette.save();
        res.json(newRecette);
        res.send("recette added successfully");
      
    }
    catch(err){
        res.status(400).send("Erreur lors de l'ajout de la recette");
        console.error("Erreur lors de l'ajout de la recette :",err);
    }
})

//la modification d'une recette;
router.put("/update/:name",async(req,res)=>{
    const updatedRecette=await req.body;
   await recette.updateOne({name:req.params.name},{$set: updatedRecette}).then(()=>{
        res.send("recette updated successfully")
    }).catch(()=>{
        res.status(404).send("recette not found")
    })
})
// la supression d'une recette;
router.delete("/delete/:name",async(req,res)=>{
    let nom=req.params.name;
    await recette.deleteOne({name:nom}).then(()=>{
        res.send("recette deleted successfully")
    }).catch(()=>{
        res.status(404).send("recette not found")
    })
})
module.exports = router;
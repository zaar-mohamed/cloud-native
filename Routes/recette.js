const express=require("express");
const router=express.Router();
const recette = require('../Models/receteeModel');

// la recuperation de toutes les recettes;
router.get("/all",(req,res)=>{
    const recettes=recette.find({});
    res.send(recettes)
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
    if(newRecette){
        res.send("recette added successfully")
    }
    else{
        res.status(400).send("Erreur lors de l'ajout de la recette")
    }
})

//la modification d'une recette;
router.put("/update/:name",async(req,res)=>{
    const updatedRecette=await req.body;
    recette.updateOne({name:req.params.name},updatedRecette).then(()=>{
        res.send("recette updated successfully")
    }).catch(()=>{
        res.status(404).send("recette not found")
    })
})
// la supression d'une recette;
router.delete("/delete/:name",(req,res)=>{
    let nom=req.params.name;
    recette.deleteOne({name:nom}).then(()=>{
        res.send("recette deleted successfully")
    }).catch(()=>{
        res.status(404).send("recette not found")
    })
})
module.exports = router;
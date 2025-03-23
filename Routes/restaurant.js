const express=require("express");
const router=express.Router();
const restaurants = require('../Models/restaurantModel');
// la recuperation des restaurants
router.get("/all", async (req, res) => {
    try {
        const allrestaurants = await restaurants.find({});
        if (allrestaurants.length > 0) {
            res.json(allrestaurants); 
        } else {
            res.status(404).send("Aucun restaurant trouvé");
        }
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).send("Server error");
    }
});

//Retourne toutes les informations sur les chefs d'un restaurant passe en paramètre.
router.get("/chefs/:restaurantname",async(req,res)=>{
    const restaurantname = await decodeURIComponent(req.params.restaurantname);
    const restaurant=await restaurants.findOne({name:restaurantname});
    if(!restaurant){
        return res.status(404).send("restaurant not found")
    }
    const chefs=await restaurants.aggregate([{
        $match:{name:restaurantname}
    },{
        $lookup:{
            from:"chef",
            localField:"_id",
            foreignField:"restaurant",
            as:"chefs"
        }
    }]);
    if(chefs){
        res.send(chefs);
    }
    else{
        res.status(404).send("chefs not found");
    }

});

// la recuperation des recette des restaurant
router.get("/recettes/:restaurantname",async(req,res)=>{
     const restaurantname=await decodeURIComponent(req.params.restaurantname);
    const recettes=await restaurants.aggregate([{$match:{name:restaurantname}},{
        $lookup:{
            from:"recette",
            localField:"_id",
            foreignField:"restaurant",
            as:"recettes"
        }
    }]);
    if(recettes){
        res.send(recettes);
    }
    else{
        res.status(404).send("recettes not found");
    }
});

// la creation d'un nouveau restaurant
router.post("/add",(req,res)=>{
    const newrestaurant=new restaurants(req.body);
    try{newrestaurant.save();
        res.json(newrestaurant);
    res.send("new restaurant added successfully");
       
}
catch(err){
    console.error("Error adding restaurant:",err);
}
})

// la modification d'un restaurant
router.put("/update/:name",async(req,res)=>{
    let nom=decodeURIComponent(req.params.name);
    const restaurant=await restaurants.findOne({name:nom});
    if(restaurant){
       await restaurants.updateOne({name:nom},{$set:req.body})
        res.send("restaurant updated successfully");
    }
    else{
        res.send("restaurant not found");
    }
});

// la suppression d'un restaurant

router.delete("/delete/:name",async(req,res)=>{
    let nom=decodeURIComponent(req.params.name);
   await restaurants.deleteOne({name:nom}).then(()=>{
        res.send("restaurant deleted successfully")
    }).catch(()=>{
        res.status(404).send("restaurant not found")
    })
});

//Retourne les restaurants ouvert entre les deux paramètres annee1 et annee2
router.get("/list/:annee1/:annee2",async(req,res)=>{
    const annee1=parseInt(req.params.annee1);
    const annee2=parseInt(req.params.annee2);
    const restaurantsDates=await restaurants.find({$and:[{ouverture:{$gt:annee1}},{ouverture:{$lt:annee2}}]})

if(restaurantsDates){
    res.json(restaurantsDates)
}
else{
    res.status(404).send("No restaurants found between those dates")
}
});

// Retourne la liste de tous les restaurants d'une catégorie passe en paramètre.

router.get("/listcategorie/:categorie",async(req,res)=>{
    const categorie=decodeURIComponent(req.params.categorie);
    const restaurantsCategorie=await restaurants.find({category:categorie})

if(restaurantsCategorie){
    res.json(restaurantsCategorie)
}
else{
    res.status(404).send("No restaurants found in this category")
}
});
module.exports = router;
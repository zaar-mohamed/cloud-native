const express=require("express");
const router=express.Router();
const restaurants=require("./RestaurantModel");
const chefs=require("../Chef/ChefModel");
const recettemodel=require("../Recette/RecetteModel")

router.get("/all",async(req,res)=>{
    const allrestaurants= await restaurants.find({});
    if(allrestaurants){
        res.json(allrestaurants);
    }
    else{
        res.status(404).send("chefs not found");
    }
});
router.get("/chefs/:restaurantname",async(req,res)=>{
    try{const restaurantname=decodeURIComponent(req.params.restaurantname);
    const chefss=await restaurants.aggregate([
        {$match:{nom:restaurantname}},
        {$lookup:{
            from : "chefs",
            localField:"chef_id",
            foreignField:"_id",
            as:"chefs"
        }},
        {$project:{
            nom:1,
            chefs:1
        }}
    ]);
    if(chefss.length===0){
        res.status(404).send("no chefs in this restaurant")
    }
    res.json(chefss[0].chefs);
    }
    catch(err){
        return res.status(400).send("Invalid restaurant name")
    }
    
});
router.get("/recettes/:restaurantname",async(req,res)=>{
    try{
        
    const restaurantname=decodeURIComponent(req.params.restaurantname);
        const recettes=await restaurants.aggregate([
       { $match : {nom:restaurantname}},
        {
            $lookup:{
                from:"recettes",
                localField:"recette_id",
                foreignField:"_id",
                as:"recettes"
            }
        },
        {
            $project:{
                
                recettes:1
            }
        }
    ]);
    if(recettes.length===0){
       return res.status(404).send("no recettes found for this restaurant")

    }
    
        res.json({"recettes de ce restaurant :":recettes[0].recettes})
    }
    catch(err){
        res.status(500).send("error serveur :")
    }
})


router.post("/add",async(req,res)=>{
   const newrrestaurant=await  restaurants.insertMany(req.body);
        
        res.json(newrrestaurant)
        res.send("Restaurant added successfully");

});
router.put("/update/:name",async(req,res)=>{
    const restaurant=await restaurants.findOneAndUpdate({nom:decodeURIComponent(req.params.name)},req.body);
    if(restaurant){
        res.json(restaurant);
    }
    else{
        res.status(404).send("Restaurant not found");
    }
});

router.delete("/delete/:name",async(req,res)=>{
    const restaurant=await restaurants.findOneAndDelete({nom:decodeURIComponent(req.params.name)});
    if(restaurant){
        res.json(restaurant);

    }
    else{
        res.status(404).send("Restaurant not found ",err);
    }
})
module.exports=router;
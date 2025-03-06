const express=require("express")
const router=express.Router();
// router.use(express.json());

const recettes=require("./RecetteModel");


router.get("/all",async(req,res)=>{
    const AllRecettes=await recettes.find({});
   if(AllRecettes){
    res.json(AllRecettes);
   }
   else{
    res.status(404).json({message: "Aucune recette trouvée"})
   }
});
router.post("/add",async(req,res)=>{
    const newrecette=await recettes.insertMany(req.body);
    // newrecette.save();
    res.json(newrecette)
    res.send("Recette added successfully");
});
router.put("/update/:name",async(req,res)=>{
    const newrecette=await recettes.findOneAndUpdate({libelle:decodeURIComponent(req.params.name)},{$set:req.body});
    if(newrecette){
        res.json(newrecette)
    }
    else{
        res.send("recette not found")
    }
})

router.delete("/delete/:name",async(req,res)=>{
    const deletedrecette=await recettes.findOneAndDelete({libelle:decodeURIComponent(req.params.name)});
    if(deletedrecette){
        res.send("recette deleted successfully")
    }
    else{
        res.send("recette not found")
    }
})
module.exports=router;
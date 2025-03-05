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
module.exports=router;
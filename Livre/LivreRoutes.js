const express=require("express")
const router=express.Router();
const livres=require("./LivreModel")
router.get("/",async(req,res)=>{
    try{
        const Allbooks=await livres.find({});
        if(Allbooks.length>0){
            res.json({books:Allbooks})
        }
        else{
            res.json({message:"No books found"})
        }
    }
    catch(err){res.json({message:err});}
});
router.post("/add",async(req,res)=>{
    try{
       const books = await livres.insertMany(req.body);
        res.json({books:books,message:"book added successfull"})
    }
    catch(err){
        res.json({message:err})
    }
});
router.put("/:id",async(req,res)=>{
    const updated=await livres.findOneAndUpdate({_id:req.params.id},req.body);
    if(updated){
      return  res.json({book:updated,message:"book updated successfull"})
    }
    else{
       return res.json({message:"book not found"})
    }

})
router.delete("/:id",async(req,res)=>{
    const deleted=await livres.findOneAndDelete({_id:req.params.id});
    if(deleted){
       return res.json({message:"book deleted successfull"})
    }
    else{
      return  res.json({message:"book not found"})
    }
});
router.get("/:id",async(req,res)=>{
    const book=await livres.findById(req.params.id);
    if(book){
       return res.json(book)
    }
    else{
      return  res.json({message:"book not found"})
    }
 });
 router.get("/changerDisponibility",(req,res)=>{
    const books=livres.find({disponible:true});
    if(books.length>0){
        livres.updateMany({},{$set:{disponible:false}});
       return res.json({message:"books set as unavailable"})
    }
    else{
       return res.json({message:"no books found"})
    }
 })
module.exports=router;
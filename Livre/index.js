const express=require("express");

const app=express();
app.use(express.json());

const mongose=require("mongoose")
mongose.connect("mongodb://localhost:27017/BookEmpruntDB")
.then(()=>console.log("Connected to BookEmpruntDB"))
.catch(err=>console.log("Error connecting"+err))
app.use("/livres",require("./LivreRoutes"));
app.listen(5432,()=>{
    console.log("listening on port 5432")
})
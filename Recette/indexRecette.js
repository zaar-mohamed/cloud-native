const express=require("express")
const app = express();
app.use(express.json());
const mongose=require("mongoose");
mongose.connect("mongodb://localhost:27017/TPMicroservice")
.then(console.log("connected to TPMicroservice"))
.catch(err=>console.log("error : ",err))

app.use("/Recettes",require("./Recette"));
// app.use("/chefs",require("../Chef/Chef"));
// app.use("/restaurants",require("../Restaurant/Restaurant"));


const port = 5432;
app.listen(port || 3000,()=>{
    console.log(`TPMicroservice running on port ${port}`);
});

// const express=require("express");
// const mongose=require("mongoose");
// const app = express();
// app.use(express.json());

// mongose.connect("mongodb://localhost:27017/TPMicroservice")
// .then(()=>console.log("connected to TPMicroservice"))
// .catch(err=>console.log("error : ",err))

// app.use("/Recettes",require("./Recette/Recette.js"));
// app.use("/chefs",require("./Chef/Chef.js"));
// app.use("/restaurants",require("./Restaurant/Restaurant.js"));


// const port = 27017;
// app.listen(port || 3000,()=>{
//     console.log(`TPMicroservice running on port ${port}`);
// });
const express=require("express");

const app=express();

app.use(express.json());
require("dotenv").config();
const host =process.env.HOST;

var cors=require("cors");
app.use(cors());

// Connect to MongoDB
const mongose=require("mongoose");
mongose.connect(`${process.env.URL_MONGOOSE}/${process.env.DATABASE}`)
    .then(()=>console.log('Connected to expressDB'))
    .catch(err=>console.error(err));

app.use("/chefs",require("./Routes/chef"));
app.use("/recettes",require("./Routes/recette"));
app.use("/restaurants",require("./Routes/restaurant"));

app.listen(process.env.PORT||3000,()=>{
    console.log(`listening to port ${process.env.PORT}`);
});
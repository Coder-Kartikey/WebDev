const express= require("express");
const app= express();
const path=require("path");

const port= 3000;

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.get("/", (req, res)=>{
        res.render("home.ejs");
        console.log("requist recieved");
});

app.listen(port, ()=>{
        console.log(`listing on port:${port}`);
});
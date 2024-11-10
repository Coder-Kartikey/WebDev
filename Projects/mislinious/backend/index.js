const express=require("express");
const app=express();

const port =8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/resister",(req,res)=>{
        let {user, password} = req.query;
        res.send(`welcome ${user} your set password is:${password}`);
        // res.send("Std GET Responce");
});

app.post("/resister",(req,res)=>{
        // res.send("Std POST Responce");
        let {user, password} = req.body;
        res.send(`welcome ${user} your set password is:${password}`);
});
        
app.listen(port, ()=>{
        console.log(`App is listing on port:${port}`);
});
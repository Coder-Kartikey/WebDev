const exp = require("constants");
const express = require("express");
const app=express();

const path = require("path");

const { v4:uuidv4 } = require('uuid');

const methodOverride= require("method-override");
app.use(methodOverride('_method'));

const port=8080;

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
        {
                id: uuidv4(),
                username:"Pandey Ji",
                content:"I love coding"
        },
        {
                id: uuidv4(),
                username:"CoderKP",
                content:"I am a coder"
        },
        {
                id: uuidv4(),
                username:"Kartikey",
                content:"I am a hindu"
        }
]

app.get("/posts",(req,res)=>{
        res.render("index.ejs",{ posts });
});

app.get("/posts/new",(req,res)=>{
        res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
        let {username,content}=req.body;
        let id=uuidv4();
        posts.push({id,username, content});
        res.redirect("http://localhost:8080/posts");
        res.send("working!!");
});

app.get("/posts/:id",(req,res)=>{
        let { id }=req.params;
        let post=posts.find((p)=> id===p.id);
        res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
        let { id }=req.params;
        let newContent= req.body.content;
        let post=posts.find( (p) => id === p.id);
        post.content=newContent;
        res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
        let { id }=req.params;
        posts=posts.filter( (p) => id !== p.id);
        res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
        let { id }=req.params;
        let post = posts.find( (p) => id === p.id);
        res.render("update.ejs",{post});
});

app.listen(port, ()=>{
        console.log("App is listing");
})
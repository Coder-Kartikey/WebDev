import express from 'express';
const app = express();

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __dirname = dirname(fileURLToPath(import.meta.url));
import path from 'path';

import { Chat } from "./models/chat.js";

import mongoose from 'mongoose';

import methodOverride from 'method-override';
import { validate } from 'uuid';

main().then( () => {
        console.log("Connection Seccessful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const port=8080;

app.set("view engine","ejs");
app.set('views', path.join(path.dirname("index.js"), 'views'));

app.use(express.static(path.join(path.dirname('index.js'),'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Chat route
app.get("/chats", async (req,res)=>{
        let chats = await Chat.find();
        // console.log(chats);
        res.render("index.ejs",{chats});
});

//Create route
app.post("/chats", (req,res) => {
        let { from, to, msg} = req.body;
        let newchat =new Chat({
                from : from,
                to : to,
                msg : msg,
                created_at : new Date()
        });
        newchat.save()
                .then( (res) => {
                        console.log("Chat Saved");
                })
                .catch( (err) => {
                        console.log(err);
                });
        res.redirect("http://localhost:8080/chats");
});

// New route
app.get("/chats/new", (req,res) => {
        res.render("new.ejs");
});

// Edit route
app.get("/chats/:id/edit", async (req,res)=>{
        let { id } = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs",{ chat });
});

// Update route
app.put("/chats/:id", async (req,res) => {
        let { id } = req.params;
        let { msg : newMsg }= req.body;
        let date= new Date();
        let chat = await Chat.findByIdAndUpdate(
                id,
                { msg : newMsg , created_at : date },
                { runValidators : true , new : true }
        );
        console.log(chat);
        res.redirect("/chats");
});

// DELETE route
app.delete("/chats/:id", async (req,res) => {
        let { id } = req.params;
        let status= await Chat.deleteOne({ _id : id });
        console.log(status);
        res.redirect("/chats");
});

// Root route
app.get("/",(req,res)=>{
        console.log("responce recieved");
        res.redirect("/chats");
});

app.listen(port, ()=>{
        console.log(`app is running on port:${port}`);
});
import mongoose from 'mongoose';

import { Chat } from "./models/chat.js";

main().then( () => {
        console.log("Connection Seccessful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChat = [
        {
                from : "neha",
                to : "priya",
                msg : "send me your msg",
                created_at : new Date()
        },
        {
                from : "kartikey",
                to : "jyoti",
                msg : "send me your resume",
                created_at : new Date()
        },
        {
                from : "abhinav",
                to : "vaibhav",
                msg : "send me these pictures",
                created_at : new Date()
        },
        {
                from : "aditya",
                to : "shashank",
                msg : "come to pull",
                created_at : new Date()
        }
];

Chat.insertMany(allChat);
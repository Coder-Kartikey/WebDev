import express from 'express';
// const express = require('express')  this will not work only import or only require will work not both 
const app = express();
const port=8080;

import { faker } from '@faker-js/faker';

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'delta_app',
        password:'Kart%#1234ikey'
});

connection.end();

app.get("/home",(req,res)=>{
        console.log("responce recieved");
        res.send("welcome to home page");
});

app.listen(port, ()=>{
        console.log(`app is running on port:${port}`);
});

////for generating random users

// let getRandomUser= ()=> {
//         return {
//                 id: faker.string.uuid(),
//                 username: faker.internet.username(), // before version 9.1.0, use userName()
//                 email: faker.internet.email(),
//                 password: faker.internet.password(),
//         };
// };

// let q=`insert into user (id, username, password, email) values (?, ?, ?, ?)`;

// for(let i=0; i<100; i++){
//         let getUser=getRandomUser();
//         let user=[getUser.id,getUser.username,getUser.email,getUser.password];
//         console.log(getUser);
//         try {
//                 const [results, fields] = await connection.query(
//                   q,user
//                 );
              
//                 console.log(results); // results contains rows returned by server
//                 // console.log(fields); // fields contains extra meta data about results, if available
//         } catch (err) {
//                 console.log(err);
//         }
// }
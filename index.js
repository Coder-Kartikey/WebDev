const express = require('express');
const app= express();

// console.dir(app);
let port =3000;

app.listen(port,()=>{
        console.log(`App is running on port no.${port}`);
});

app.use((req,res)=>{
        console.log("Responce recieved");
        res.send("<h1>CoderKP with some chages</h1>");
        // res.send(app);
});
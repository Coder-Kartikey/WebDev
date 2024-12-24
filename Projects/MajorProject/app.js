import express from 'express';
const app = express();

import ejsMate from 'ejs-mate';
app.engine('ejs', ejsMate);

import path from 'path';

import listings from "./routes/listing.mjs";

import reviews from "./routes/review.mjs";

import { ExpressError } from "./utils/ExpressError.js";

import mongoose from 'mongoose';

import methodOverride from 'method-override';

import session, { Cookie } from 'express-session';

import flash from 'connect-flash';

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

main().then( () => {
        console.log("Connection Seccessful")
})
.catch(err => console.log(err));

const port=8080;

app.set("view engine","ejs");
app.set('views', path.join(path.dirname("app.js"), 'views'));

app.use(express.static(path.join(path.dirname('app.js'),'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const sessionOptions = {
        secret : "mysupersecretcode",
        resave : false,
        saveUninitialized : true,
        cookie: {
                expires : Date.now + 1000 * 60 * 60 * 24 * 3,
                maxAge : 1000 * 60 * 60 * 24 * 3,
                httpOnly : true
        }
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        next();
});

// Root route
app.get("/", (req,res) => {
        console.log("responce recieved");
        res.redirect("/listings");
});

app.use("/listings",listings);

app.use("/listings/:id/reviews",reviews);

app.all("*", (req, res, next) =>{
        next(new ExpressError(404,"Page not found!"));
});

app.use((err, req, res, next) => {
        let { statusCode=500, massage="Something went wrong!" } = err;
        res.status(statusCode).render("error.ejs",{err, massage});
        // res.status(statusCode).send(massage);
});

app.listen(port, ()=>{
        console.log(`app is running on port:${port}`);
});
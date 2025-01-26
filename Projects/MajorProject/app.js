import express from 'express';
const app = express();

import ejsMate from 'ejs-mate';
app.engine('ejs', ejsMate);

import path from 'path';

import listingsRouter from "./routes/listing.mjs";

import reviewsRouter from "./routes/review.mjs";

import userRouter from "./routes/user.mjs";

import { ExpressError } from "./utils/ExpressError.js";

import mongoose from 'mongoose';

import methodOverride from 'method-override';

import session, { Cookie } from 'express-session';

import flash from 'connect-flash';

import passport from 'passport';

import LocalStrategy from 'passport-local';

import User from './models/user.js';

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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        res.locals.currentUser = req.user;
        next();
});

app.get("/fakeuser", async (req, res) => {
        const user = new User({
                email: "fakeuser@example.com",
                username: "fakeuser"
        });

        const newUser = await User.register(user, "chicken");
        res.send(newUser);
});

// Root route
app.get("/", (req,res) => {
        console.log("responce recieved");
        res.redirect("/listings");
});

app.use("/listings",listingsRouter);

app.use("/listings/:id/reviews",reviewsRouter);

app.use("/",userRouter);

app.all("*", (req, res, next) =>{
        next(new ExpressError(404,"Page not found!"));
});

app.use((err, req, res, next) => {
        console.error("Error caught in error handler:", err);
        let { statusCode=500, massage="Something went wrong!" } = err;
        res.status(statusCode).render("error.ejs",{err, massage});
        // res.status(statusCode).send(massage);
});

app.listen(port, ()=>{
        console.log(`app is running on port:${port}`);
});
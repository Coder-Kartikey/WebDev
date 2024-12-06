import express from 'express';
const app = express();

import ejsMate from 'ejs-mate';
app.engine('ejs', ejsMate);

import path from 'path';

import { Listing } from "./models/listing.js";

import { Review } from "./models/review.js";

import { wrapAsync } from "./utils/wrapAsync.js";

import { ExpressError } from "./utils/ExpressError.js";

import { listingSchema } from "./schema.cjs";

import { reviewSchema } from "./schema.cjs";

import mongoose from 'mongoose';

import methodOverride from 'method-override';

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

// Root route
app.get("/", (req,res) => {
        console.log("responce recieved");
        res.redirect("/listings");
});

const validateListing= (req,res,next) => {
        let { error } = listingSchema.validate(req.body);
        if(error){
                let errMsg=error.details.map((el) => el.message).join(",");
                throw new ExpressError(400, errMsg);
        } else{
                next();
        }
};

const validateReview= (req,res,next) => {
        let { error } = reviewSchema.validate(req.body);
        if(error){
                let errMsg=error.details.map((el) => el.message).join(",");
                throw new ExpressError(400, errMsg);
        } else{
                next();
        }
};

// Index route
app.get("/listings", wrapAsync(  async (req,res) => {
        const allListings= await Listing.find({});
        res.render("./listings/index.ejs", {allListings});
})
);

// New route
app.get("/listings/new", (req,res) => {
        res.render("./listings/new.ejs")
});

// Create route
app.post(
        "/listings", validateListing,
        wrapAsync( async (req,res) => {
        // for first time difining

        // const listing =req.body.listing;
        // let newListing = new Listing({
        //         title : listing.title,
        //         image : {
        //                 filename: listing.filename,
        //                 url: listing.url
        //         },
        //         description : listing.description,
        //         price : listing.price,
        //         location : listing.location,
        //         country : listing.country
        // });
                const newListing = new Listing(req.body.listing);
                await newListing.save();
                res.redirect("/listings");
        })
);

// Edit route
app.get("/listings/:id/edit", wrapAsync(  async (req,res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        res.render("./listings/edit.ejs", {listing});
})
);

// New Review route
app.post("/listings/:id/reviews", validateReview,
        wrapAsync( async (req, res) => {
                const { id } = req.params;
                const newReview = new Review(req.body.review);
                let listing = await Listing.findById(id);
                let out = listing.reviews.push(newReview);
                await newReview.save();
                await listing.save();
                res.redirect("/listings/"+id);
        })
);

// Delete Review route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(  async (req,res) => {
                const { id , reviewId } = req.params;
                await Review.deleteOne({ _id : reviewId });
                await Listing.findByIdAndUpdate(id, { $pull : {reviews : reviewId } } );
                res.redirect("/listings/"+id);
        })
);

// Update route
app.put("/listings/:id", validateListing, wrapAsync(  async (req,res) =>  {
        if(!req.body.listing){
                throw new ExpressError(400, "Send valid data for listing!")
        }
        const { id } = req.params;
        const updateListing =req.body.listing;
        const listing = await Listing.findByIdAndUpdate(id, updateListing);
        res.redirect("/listings/"+id);
})
);

// Show route
app.get("/listings/:id", wrapAsync(  async (req,res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        res.render("./listings/show.ejs", { listing });
})
);

// Delete route
app.delete("/listings/:id", wrapAsync(  async (req,res) => {
        const { id } = req.params;
        await Listing.deleteOne({ _id : id });
        res.redirect("/listings");
})
);

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

        // testListing route
        // app.get("/testListing", async (req,res) =>{
        //         let sampleLinsting = new Listing({
        //                 title : "My new villa",
        //                 description : "By the beach",
        //                 price : 1200,
        //                 location : "calangute ,Goa",
        //                 country : "India"
        //         })
        //         await sampleLinsting.save();
        //         console.log("Sample saved");
        //         res.send("Testing successful");
        // });
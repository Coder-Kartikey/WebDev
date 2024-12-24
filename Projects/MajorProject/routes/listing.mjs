import express from 'express';
const router = express.Router();

import { Listing } from "../models/listing.js";

import { wrapAsync } from "../utils/wrapAsync.js";

import { ExpressError } from "../utils/ExpressError.js";

import { listingSchema } from "../schema.cjs";

const validateListing= (req,res,next) => {
        let { error } = listingSchema.validate(req.body);
        if(error){
                let errMsg=error.details.map((el) => el.message).join(",");
                throw new ExpressError(400, errMsg);
        } else{
                next();
        }
};

// Index route
router.get("/", wrapAsync(  async (req,res) => {
        const allListings= await Listing.find({});
        res.render("./listings/index.ejs", {allListings});
})
);

// New route
router.get("/new", (req,res) => {
        res.render("./listings/new.ejs")
});

// Create route
router.post(
        "/", validateListing,
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
                req.flash("success", "New Listing Added!");
                res.redirect("/listings");
        })
);

// Edit route
router.get("/:id/edit", wrapAsync(  async (req,res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
                req.flash("error", "Listing does not exist!");
                res.redirect("/listings");
        }
        res.render("./listings/edit.ejs", {listing});
})
);

// Update route
router.put("/:id", validateListing, wrapAsync(  async (req,res) =>  {
        if(!req.body.listing){
                throw new ExpressError(400, "Send valid data for listing!")
        }
        const { id } = req.params;
        const updateListing =req.body.listing;
        const listing = await Listing.findByIdAndUpdate(id, updateListing);
        req.flash("success", "Listing Updated!");
        res.redirect("/listings/"+id);
})
);

// Show route
router.get("/:id", wrapAsync(  async (req,res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        if(!listing){
                req.flash("error", "Listing does not exist!");
                res.redirect("/listings");
        }
        res.render("./listings/show.ejs", { listing });
})
);

// Delete route
router.delete("/:id", wrapAsync(  async (req,res) => {
        const { id } = req.params;
        await Listing.deleteOne({ _id : id });
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
})
);

export default router;
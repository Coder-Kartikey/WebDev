import express from 'express';
const router = express.Router({mergeParams : true});

import { Listing } from "../models/listing.js";

import { Review } from "../models/review.js";

import { wrapAsync } from "../utils/wrapAsync.js";

import { ExpressError } from "../utils/ExpressError.js";

import { reviewSchema } from "../schema.cjs";

const validateReview= (req,res,next) => {
        let { error } = reviewSchema.validate(req.body);
        if(error){
                let errMsg=error.details.map((el) => el.message).join(",");
                throw new ExpressError(400, errMsg);
        } else{
                next();
        }
};

// Create Review route
router.post("/", validateReview,
        wrapAsync( async (req, res) => {
                const { id } = req.params;
                const newReview = new Review(req.body.review);
                let listing = await Listing.findById(id);
                let out = listing.reviews.push(newReview);
                await newReview.save();
                await listing.save();
                req.flash("success", "New Review Added!");
                res.redirect("/listings/"+id);
        })
);

// Delete Review route
router.delete("/:reviewId", wrapAsync(  async (req,res) => {
                const { id , reviewId } = req.params;
                await Review.deleteOne({ _id : reviewId });
                await Listing.findByIdAndUpdate(id, { $pull : {reviews : reviewId } } );
                req.flash("success", "Review Deleted!");
                res.redirect(`/listings/${id}`);
        })
);

export default router;
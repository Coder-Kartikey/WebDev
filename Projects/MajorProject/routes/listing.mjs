import express from 'express';

export const router = express.Router();

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn, isOwner, validateListing } from "../middelware.js";

import listingControllers from "../controllers/listings.mjs";

// root route
router
.route("/")
.get(wrapAsync(listingControllers.index))  // Index route
.post(isLoggedIn, validateListing, wrapAsync(listingControllers.createNewListing)); // Create route

// New route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.renderEditForm));

// Id route
router
.route("/:id")
.put(isLoggedIn, isOwner, validateListing, wrapAsync(listingControllers.updateListing)) // Update route
.get(wrapAsync(listingControllers.showListing)) // Show route
.delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing)); // Delete route

export default router;
const express= require("express");
const router=express.Router({mergeParams:true});
const wrapAsync= require("../utils/wrapAsync.js");
const Review= require("../models/review.model.js");
const Listing= require("../models/listing.model.js");
const {validateReview, isLoggedIn, isOwner,isReviewAuthor}=require("../middleware.js");
const reviewController= require("../controllers/review.controller.js")


// POST ROUTE
router.post("/", isLoggedIn,validateReview,wrapAsync(reviewController.reviewPost));

// REVIEW DELETE ROUTE
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));



module.exports=router;
const express= require("express");
const router=express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing= require("../models/listing.model.js");
const {isLoggedIn,isOwner,validateListing}= require("../middleware.js")
const listingController= require("../controllers/listings.controller.js")
const multer  = require('multer');
const {storage}= require("../cloudConfig.js")
const upload = multer({ storage});



router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing));

  //NEW ROUTE
  router.get("/new",isLoggedIn,listingController.renderNewForm);
         

router.route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(isLoggedIn, 
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateForm))
   .delete(isLoggedIn, isOwner,
       wrapAsync(listingController.deleteForm));
             
    //EDIT ROUTE
    router.get("/:id/edit",isLoggedIn,
    wrapAsync(listingController.renderEditForm));

    
        //INDEX ROUTE
        //router.get("/",wrapAsync(listingController.index));
         
          
                 
         //SHOW ROUTE
         //router.get("/:id", wrapAsync(listingController.showListings));
         
         
         //CREATE ROUTE
         //router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createForm));
                   
             
         
         //UPDATE ROUTE
        //  router.put("/:id",isLoggedIn, isOwner,
        //  validateListing,
        //  wrapAsync(listingController.updateForm));
         
         
         //DELETE ROUTE
        //  router.delete("/:id",isLoggedIn, isOwner,
        //   wrapAsync(listingController.deleteForm));
         

        module.exports=router;
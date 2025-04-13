const express=require("express");
const router=express.Router();
const {listingSchema,reviewSchema}=require("../schema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingcontroller=require("../controllers/listing.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


router.route("/")
   .get(wrapAsync(listingcontroller.index))
   .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingcontroller.createListing));

//New route
router.get("/new",isLoggedIn,listingcontroller.rendernewForm);
    

router.route("/:id")
   .get(wrapAsync(listingcontroller.showlisting))
   .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingcontroller.updateListing))
   .delete(isLoggedIn,isOwner,wrapAsync(listingcontroller.deleteListing));



//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingcontroller.editListing));

module.exports=router;
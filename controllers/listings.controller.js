const Listing= require("../models/listing.model.js")

module.exports.index=async (req,res)=>{
    const allListings= await Listing.find({});
         res.render("listings/index.ejs",{allListings});
     };

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
    };


module.exports.showListings=async(req,res)=>
    {
         let {id}=req.params;
         const listing= await Listing.findById(id)
         .populate({path:"reviews", populate:{path:"author"},
         })
         .populate("owner")
         if(!listing){
           req.flash("error","listing you requested for doesnt exist!");
           res.redirect("/listings");
         }
         res.render("listings/show.ejs",{listing});
   };

   module.exports.createListing=async(req,res,next)=>{
    
    let url=req.file.path;
    let filename= req.file.filename;

    // let{title,description,image,price,country,location}=req.body;
   
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename};
        await newListing.save();
        req.flash("success","New listing created!");
        res.redirect("/listings");
    };

    module.exports.renderEditForm=async (req,res)=>{
        let {id}=req.params;
         const listing= await Listing.findById(id);
         if(!listing){
           req.flash("error","listing you requested for doesnt exist!");
           res.redirect("/listings");
         }
        
         let originalImageUrl=listing.image.url;
         originalImageUrl=originalImageUrl.replace("/upload", "/upload/h_300/e_blur:200" )

         req.flash("success","listing edited!");
         res.render("listings/edit.ejs",{listing, originalImageUrl});
    };


    module.exports.updateForm=async (req,res)=>{
        let {id}=req.params;          
        let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

        if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename= req.file.filename;
        listing.image={url,filename}
        await listing.save();
        }
        req.flash("success","listing updated!");
        res.redirect(`/listings/${id}`);
    };


    module.exports.deleteForm=async(req,res)=>{
        let {id}=req.params;
        let deleteListing= await Listing.findByIdAndDelete(id);
         console.log(deleteListing);
         req.flash("error","listing is deleted!");

         res.redirect("/listings")
    }
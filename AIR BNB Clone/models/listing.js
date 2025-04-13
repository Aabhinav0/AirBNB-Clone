let mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js")

const listingschema=new Schema({

    title:{ 
        type:String,
        required:true,
    },

    description: String,
    image: 
        {
            url:String,
            filename:String,
        },
    price: Number,
    location: String,
    country: String,

    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],

    owner : {
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true,
        },
        coordinates:{
            type:[Number],
            required:true,
        }
    }

});


listingschema.post("findOneAndDelete",async(req,res)=>{
    if(Listing){
        await Review.deleteMany({_id :{$in: Listing.review}});
    }
})





const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;
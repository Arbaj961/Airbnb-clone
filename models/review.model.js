const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const reviewSchema= new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        maz:5
    },
    creatdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

const Review = mongoose.model("Review",reviewSchema);
module.exports=Review;
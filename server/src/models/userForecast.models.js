import mongoose from "mongoose";

const userForecastSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    predictionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Prediction",
        required:true
    },
    stakeAmount:{
        type:Number,
        required:true
    },
    choice:{
        type:String,
        enum:["yes","no"],
        required:true
    },
    rewardAmount:{
        type:Number,
        default:0,
        required:true
    },
    result:{
        type:String,
        enum:["pending",'won',"lost"],
        default:"pending"
    }

},{timestamps:true})

 const userForecast=mongoose.model('userForecast',userForecastSchema)
 export default userForecast
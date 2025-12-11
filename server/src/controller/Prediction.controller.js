import Prediction from "../models/prediction.models.js";
import User from "../models/auth.models.js";

export const createPrediction=async(req,res)=>{
    const{question,category,startTime,endTime}=req.body
    console.log(req.user)
    console.log(question,category,startTime,endTime)

    if(!question || !category || !startTime || !endTime){
        return res.status(400).json({
            success:false,
            message:"All fields are required"})
    }
    try {
         if(new Date(startTime)>=new Date(endTime)){
        return res.status(400).json({
            message:"Start time should be less than end time"})
        }

        const prediction=await Prediction.create({
            question,
            category,
            startTime,
            endTime,
            createdBy:req.user._id  
        })
        if(!Prediction){
            return res.status(400).json({
                success:false,
                message:"Prediction not created"})
        }
        res.status(200).json({
            success:true,
            message:"Prediction created successfully",
            Prediction:{
                prediction
            },
            user:req.user
  
         
        })

    
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,
            message:"Something went wrong"})
        
    }
   
}
export const getPrediction=async(req,res)=>{
    const{status}=req.query;
    const now=new Date();
    let filter={}

    if (status=="live"){
        filter={
            startTime:{$lte:now},
            endTime:{$gte:now},
            result:null
        }
    }
    else if(status=="upcoming"){
        filter={
            startTime:{$gte:now}
        }
    }
    else if(status=="closed"){
        filter={
            endTime:{$lte:now}
        }
    }
    else if (status=="settled"){
        filter={
            result:{$ne:null}
        }
    }
    else{
        filter={
            result:null
        }

    }
    
    //Prediction.find never returns null it returns empty array
    // if(!prediction){
    //     return res.status(400).json({
    //         success:false,
    //         message:"Prediction not found"})
    // }
    const predictions = await Prediction.find(filter).sort({ startTime: 1 });

    

    if (predictions.length === 0) {
    return res.status(404).json({
        success: false,
        message: "No predictions found"
    });
}
  const responseWithStatus=predictions.map(p=>{
    let statusValue="upcomimg"
    if(p.result!= null) statusValue="settled"
    else if(p.startTime>now) statusValue="upcoming"
    else if(p.startTime<=now && now<=p.endTime) statusValue="live"
    else if(p.endTime<now) statusValue="closed"

    return{
        ...p.toObject(),
        status:statusValue
    };

  })

    res.status(200).json({
        success:true,
        message:"Prediction found successfully",
        count:predictions.length,
        data:responseWithStatus
    })
    

}
export const getPredictionById=async(req,res)=>{}
export const setPredictionResult=async(req,res)=>{}
import userForecast from "../models/userForecast.models.js";
import Prediction from "../models/prediction.models.js";
import Wallet from "../models/wallet.models.js";
import userForecast from "../models/userForecast.models.js";


const submitForecast=async(req,res)=>{
    try {
        const userId=req.user.id
        const{forecastId}=req.params
        const{choice,forecastAmount}=req.body
        console.log(choice,forecastAmount,forecastId)
        //basic validation
        if(!choice||!forecastAmount){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //check whether the forecast/prediction exist or not
        const forecast=await Prediction.findById(forecastId)
        if(!forecast){
            return res.status(400).json({
                success:false,
                message:"Forecast doesn't exist"
            })
        }
        //find the user wallet
        const wallet=await Wallet.findOne({userId})
        if(!wallet || wallet.balance<forecastAmount){
            return res.status(400).json({
                success:false,
                message:'Insufficient wallet funds'
            })
        }
        //check if forecast is live
        const now=new Date();
        if(now<forecast.startTime||now>forecast.endTime){
            return res.status(400).json({
                success:false,
                message:"Forecast is not live"
            })
        }
        wallet.balance-=forecastAmount
        await wallet.save()

        const userForecast=await userForecast.create({
            userId,
            forecastId,
            choice,
            forecastAmount,

        })
        if(choice=='yes'){
            forecast.totalYesStake+=forecastAmount
            forecast.yesVotes+=1
        }
        else if(choice=='no'){
            forecast.totalNoStake+=forecastAmount
            forecast.noVotes+=1
        }
        res.status(200).json({
            success:false,
            forecast:userForecast,
            message:"Forecast Submitted successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })

        
    }
}
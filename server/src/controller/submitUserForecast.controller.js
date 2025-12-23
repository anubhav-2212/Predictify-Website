import userForecast from "../models/userForecast.models.js";
import Prediction from "../models/prediction.models.js";
import Wallet from "../models/wallet.models.js";



export const submitForecast=async(req,res)=>{
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
        //validation on forecast amount type 
        if(
            typeof forecastAmount!=="number" ||
            forecastAmount<=0
        ){
            return res.status(400).json({
                success:false,
                message:"forecast amount must be a number"
            })
        }
        //validation on choice enum
        if(!['yes','no'].includes(choice)){
            return res.status(400).json({
                success:false,
                message:"Choice should be either yes or no"
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
        //check if the result is pending aur not
        if(forecast.result!=="pending"){
            return res.status(400).json({
                success:false,
                message:"Result is not declared"
            })
        }
        wallet.balance-=forecastAmount
        await wallet.save()
        const existingForecast=await userForecast.findOne({userId,forecastId})
        if(existingForecast){
            return res.status(400).json({
                success:false,
                message:"Forecast already done"
            })
        }

        const submittedForecast=await userForecast.create({
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
        await forecast.save()
        res.status(200).json({
            success:true,
            forecast:submittedForecast,
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
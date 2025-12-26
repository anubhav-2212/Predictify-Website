import express from "express";
import userForecastController, { submitForecast } from "../controller/userForecast.controller.js";
import userMiddleware from "../middlewares/auth.middlewares.js";
const userForecastRouter=express.Router();

userForecastRouter.post('/submit/:forecastId',userMiddleware,submitForecast)

export default userForecastRouter
import express from "express";
import { createPrediction, deletePrediction, getPrediction, getPredictionById } from "../controller/Prediction.controller.js";
import userMiddleware from '../middlewares/auth.middlewares.js';
import { isAdmin } from '../middlewares/admin.middlewares.js';
import { submitForecast } from "../controller/submitUserForecast.controller.js";

const predictionRoutes = express.Router();

predictionRoutes.post("/create",userMiddleware,createPrediction)
predictionRoutes.get("/all",userMiddleware,getPrediction)
predictionRoutes.get('/:id',userMiddleware,getPredictionById)
predictionRoutes.delete('/delete/:id',userMiddleware,isAdmin,deletePrediction)
predictionRoutes.post('/submit/:forecastId',userMiddleware,submitForecast)


export default predictionRoutes

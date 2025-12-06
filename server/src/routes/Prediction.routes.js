import express from "express";
import { createPrediction } from "../controller/Prediction.controller";
const predictionRoutes = express.Router();

predictionRoutes.post("/createPredction",createPrediction)

export default predictionRoutes

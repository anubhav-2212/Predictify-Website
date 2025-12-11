import express from "express";
import { createPrediction, getPrediction } from "../controller/Prediction.controller.js";
import userMiddleware from '../middlewares/auth.middlewares.js';
import { isAdmin } from '../middlewares/admin.middlewares.js';
const predictionRoutes = express.Router();

predictionRoutes.post("/create",userMiddleware, isAdmin,createPrediction)
predictionRoutes.get("/all",userMiddleware,getPrediction)


export default predictionRoutes

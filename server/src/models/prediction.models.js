import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    category: {
      type: String,
      
    },
    startTime: {
      type: Date,
      required: true    
    },
    endTime: {
      type: Date,
      required: true    
    },


    yesVotes: {
      type: Number,
      default: 0
    },

    noVotes: {
      type: Number,
      default: 0
    },
    totalYesStake: {
      type: Number,
      default: 0
    },
    totalNoStake: {
      type: Number,
      default: 0
    },

    result: {
      type: String,
      enum: ["yes", "no", null],
      default: null
    },

    status: {
      type: String,
      enum: ["UPCOMING", "LIVE", "CLOSED","SETTLED"],
      default: "LIVE"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true
    }
  },
  { timestamps: true }
);
const Prediction= mongoose.model("Prediction", predictionSchema);
export default Prediction

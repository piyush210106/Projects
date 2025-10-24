import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // user with role = "candidate"
    required: true,
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // user with role = "recruiter"
    required: true,
  },
  interviewType: {
    type: String,
    enum: ["technical", "HR", "behavioral"],
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  meetLink: {
    type: String,
  },
  feedback: {
    type: String
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
}, { timestamps: true });

const Interview = mongoose.model("Interview", interviewSchema)
export default Interview;

// models/Interview.js
import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  meetingId: {
    type: String, // Random unique string
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled"
  },
  feedback: {
    type: String
  }
});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;

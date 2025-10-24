import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["selected_to_apply", "applied", "interview_scheduled", "hired", "rejected"],
      default: "selected_to_apply",
      required: true,
    },
    source: {
      type: String,
      enum: ["internal", "external"],
      required: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;

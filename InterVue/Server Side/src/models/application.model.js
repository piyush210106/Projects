import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        requried: true
    },
    status: {                               //"selected to apply" | "applied" | "interview_scheduled" | "hired" | "rejected"
        Type: String,
        required: true
    },
    source: {                               // internal | external
        type: String,
        required: true
    }
}, {timestamps: true});


const Application = mongoose.model("Application", applicationSchema);

export default Application;;
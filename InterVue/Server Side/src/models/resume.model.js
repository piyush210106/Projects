import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to candidate user model
    required: true,
  },
    fileUrl: {
        type: String, // URL to cloud storage
        required: true,
    },
    fileName: String,
    parsedData: {
        name: String,
        email: String,
        phone: String,
        skills: [String],
        experience: [
        {
            company: String,
            role: String,
            duration: String,
            description: String,
        },
        ],
        education: [
        {
            institution: String,
            degree: String,
            year: String,
        },
        ],
    }
}, {timestamps: true});


const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
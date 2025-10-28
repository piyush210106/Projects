import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
    fileUrl: {
        type: String, 
        required: true,
    },
    fileName: String,
    rawData: {
        type: String, 
        required: true
    },
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
        projects: [
            {
                title: String,
                description: String,
                technologies: [String], 
            }
        ]
    }
}, {timestamps: true});


const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
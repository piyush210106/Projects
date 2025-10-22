import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {                 // "Full-time" | "Internship" | "Remote"
        type: String,
        required: true
    },
    source: {               // "internal" | "external"
        type: String,
        required: true
    },
    apisource: {            // "LinkedIn", "Indeed", "Naukri"
        type: String || null
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    skills: {
        type: String
    },
    url: {
        type: String || null
    }
}, {timestamps: true});

const Job = mongoose.model("Job", jobSchema);

export default Job;
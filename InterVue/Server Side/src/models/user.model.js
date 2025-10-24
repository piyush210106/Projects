import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    google: {
        google_id: {type: String, required: true},
        googleRefresh_token: {type: String},
        googleAccess_token: {type: String}
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {                 // Candidate | Recruiter
        type: String,
        enum:["Candidate", "Recruiter"],
        default: null
    },
    linkedIn: {
        type: String,
        required: true
    },
    resumeURL: {
        type: String,
    },
    refreshtoken: {
        type: String,
        required: true
    }
}, {timestamps: true})


const User = mongoose.model("User", userSchema);

export default User;
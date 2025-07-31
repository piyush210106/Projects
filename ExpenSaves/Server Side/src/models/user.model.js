import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        profile: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true
    });

export default User = mongoose.model("User", userSchema);
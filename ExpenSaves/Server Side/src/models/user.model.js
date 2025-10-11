import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        google_id:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        profile_pic: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            required: false
        },
        google: {
            refresh_token: {type: String},
            access_token: {type: String}
        }
    }, 
    {
        timestamps: true
    });

const User = mongoose.model("User", userSchema);
export default User;
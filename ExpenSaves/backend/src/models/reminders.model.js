import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        reminderDate:{
            type: Date,
            required: true
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true})

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
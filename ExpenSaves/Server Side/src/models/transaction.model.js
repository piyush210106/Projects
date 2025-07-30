import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
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
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true})

export default Transaction = mongoose.model("Transation", transactionSchema);
import Transaction from "../models/transaction.model.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


const addTransaction = async (req, res) => {
    
try {
    let user = await User.findById(req.userId);
    if(!user) return res.status().json({message: "Invalid User"});

    let { amount, title, category, type, date } = req.body.data;
    if(!amount || !title || !category || !type || !date) 
        return res.status().json({message: "All fields Required"});

    let newtransaction = new Transaction({
        title,
        amount,
        type,
        category,
        date,
        userid: user._id
    })
    await newtransaction.save();
    return res.status().json({message: "Transaction added Successfully!!", newtransaction});

} catch (error) {
    return res.status().json({message: "Error in adding transaction ", error});
}
}   

const getHistory =  async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        if(!user) return res.status().json({message: "User not Found"});

        const transactions = await Transaction.find({userid: req.userId})
                                              .sort({date: -1});
        return res.status().json(transactions);
    } catch (error) {
        return res.status().json({message: "Error in fetching transactions ", error});
    }
}

export {addTransaction, getHistory}
import Transaction from "../models/transaction.model.js"
import User from "../models/user.model.js"


const addTransaction = async (req, res) => {
    
try {
    let user = await User.findById(req.userId);
    if(!user) return res.status().json({message: "Invalid User"});
    let { amount, title, category, type, date } = req.body;
    if(!amount || !title || !category || !type || !date) 
        return res.status(400).json({message: "All fields Required"});

    let newtransaction = new Transaction({
        title,
        amount,
        type,
        category,
        date,
        userid: user._id
    })
    await newtransaction.save();
    return res.status(201).json({message: "Transaction added Successfully!!", newtransaction});

} catch (error) {
    console.log(error);
    return res.status(400).json({message: "Error in adding transaction ", error});
}
}   

const getHistory =  async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        if(!user) return res.status(400).json({message: "User not Found"});

        const transactions = await Transaction.find({userid: req.userId})
                                              .sort({date: -1});
        return res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error in fetching transactions ", error});
    }
}

export {addTransaction, getHistory}
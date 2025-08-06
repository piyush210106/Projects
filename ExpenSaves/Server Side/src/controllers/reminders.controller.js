import User from "../models/user.model.js"
import Reminder from "../models/reminders.model.js"
import jwt from "jsonwebtoken"


const addReminder = async (req, res) => {
    
try {
    let token = req.cookie.accessToken;
    let userId;

    try {
        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        userId = decoded.id;
    } catch (error) {
        return res.status().json({message: "Invalid or Expired token"});
    }

    let user = await User.findById(decoded_id);
    if(!user) return res.status().json({message: "Invalid User"});

    let { amount, title, category, type, reminderDate } = req.body.data;
    if(!amount || !title || !category || !type || !reminderDate) 
        return res.status().json({message: "All fields Required"});

    let newreminder = new Reminder({
        title,
        amount,
        type,
        category,
        reminderDate,
        userid: user._id
    })
    await newreminder.save();
    return res.status().json({message: "Reminder added Successfully!!", newreminder});

} catch (error) {
    return res.status().json({message: "Error in adding reminder ", error});
}
} 

const getReminders = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        if(!user) return res.status().json({message: "Unauthorized"});

        const reminders = await Reminder.find({userid: req.userId})
                                        .sort({date: 1})
    } catch (error) {
        return res.status().json({message: "Error in fetching reminders ", error});
    }
}

export {addReminder, getReminders}

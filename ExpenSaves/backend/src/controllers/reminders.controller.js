import User from "../models/user.model.js"
import Reminder from "../models/reminders.model.js"
import {addReminderToCalendar} from "../utils/Calendar.utils.js"

const addReminder = async (req, res) => {
    
try {
    let user = await User.findById(req.userId);
    if(!user) return res.status(400).json({message: "Invalid User"});
    console.log(req.body);
    let { amount, title, category, type, reminderDate } = req.body;
    if(!amount || !title || !category || !type || !reminderDate) 
        return res.status(400).json({message: "All fields Required"});

    let newreminder = new Reminder({
        title,
        amount,
        type,
        category,
        reminderDate,
        userid: user._id
    })
    await newreminder.save();
    await addReminderToCalendar(req.userId, newreminder);
    return res.status(201).json({message: "Reminder added Successfully!!", newreminder});

} catch (error) {
    console.log(error);
    return res.status(400).json({message: "Error in adding reminder ", error});
}
} 

const getReminders = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        if(!user) return res.status(401).json({message: "Unauthorized"});

        const reminders = await Reminder.find({userid: req.userId})
                                        .sort({date: 1})
        return res.status(200).json(reminders);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error in fetching reminders ", error});
    }
}

export {addReminder, getReminders}

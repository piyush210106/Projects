import Job from "../models/job.model.js"
import Application from "../models/application.model.js";
import User from "../models/user.model.js"
import Interview from "../models/interview.model.js";
import axios from "axios";

const getexjobs = async (req, res) => {
    
    try {
        const options = {
            method: 'GET',
            url: 'https://api.adzuna.com/v1/api/jobs/us/search/1',
            params: {
                app_id: process.env.ADZUNA_API_ID,
                app_key: process.env.ADZUNA_API_KEY,
                results_per_page: 25,
                what: 'software engineer', 
                max_days_old: 20,
                'content-type': 'application/json' 
            }
        }; 
        
        const { data } = await axios.request(options);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getting exjobs!! ", error);
    }
}

const getinjobs = async (req, res) => {
    try {
        const injobs = await Job.find();
        return res.status(200).json(injobs);
    } catch (error) {
        console.error("Error in getting injobs ", error);
    }
}

const getappliedjobs = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) return res.status(400).json({message: "Error in finding user"});
        const appliedjobs = await Application.find({user: req.userId}).populate("User").populate("Job");
        return res.status(200).json(appliedjobs);
    } catch (error) {
        console.log("Error in finding applied jobs ", error);
    }
}

const getselectedjobs = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) return res.status(400).json({message: "Error in finding user"});
        const appliedjobs = await Application.find({user: req.userId, status: "selected_to_apply"}).populate("User").populate("Job");
        return res.status(200).json(appliedjobs);
    } catch (error) {
        console.log("Error in finding selected jobs ", error);
    }
}

const getmeetings = async(req, res) => { 
    try {
        const user = await User.findById(req.userId);
        if(!user) return res.status(400).json({message: "Error in finding user"});
        const meetings = await Interview.find({candidate: req.userId}).populate("Application").populate("User");
        return res.status(200).json(meetings);
    } catch (error) {
        console.log("Error in finding scheduled meetings ", error);
    }
}

export {getexjobs, getinjobs, getappliedjobs, getselectedjobs, getmeetings};


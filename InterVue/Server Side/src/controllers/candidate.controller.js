import Job from "../models/job.model.js"
import Application from "../models/application.model.js";
import User from "../models/user.model.js"
import Interview from "../models/interview.model.js";
import axios from "axios";

const getexjobs = async (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://api.theirstack.com/v1/jobs/search',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.THEIRSTACK_API_KEY}`},
        data: {page: 0, limit: 25, job_country_code_or: ['US'], posted_at_max_age_days: 20, "job_title_or": ["software engineer", "data scientist"]}
    };
    try {
        const { data } = await axios.request(options);
        return res.json(data);
    } catch (error) {
        console.error(error);
    }
}

const getinjobs = async (req, res) => {
    try {
        const injobs = await Job.find({source: "Internal"});
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


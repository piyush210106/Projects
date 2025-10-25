import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js"
import Job from "../models/job.model.js";
const addjob = async (req, res) => {
    try {
        let recruiter = await User.findById(req.userId);

        const {title, company, location, type, description, salary, requirements, skills} = req.data;
        if(!title || !company || !location || !type || !description || !requirements || !skills || !salary) return res.status(400).json({message: "All fields required"});

        let newjob = new Job({
            title: title,
            company: company, 
            location: location,
            type: type,
            source: "Internal",
            description: description,
            requirements: requirements,
            skills: skills,
            salary: salary,
            recruiter: recruiter
        });
        await newjob.save();
        return res.status(200).json({message: "job added successfully"});
    } catch (error) {
        console.log("Error in adding job ", error);
    }
}

const getappliedCandidates = async(req, res) => {
    const recruiterId = req.userId;

    const jobs = await Job.find({recruiter: recruiterId}).select("_id");

    const jobsId = jobs.map((job) => job._id);

    const applications = await Application.find({job: { $in: jobIds }}).populate("User").populate("Job");
    return res.status(applications);
}



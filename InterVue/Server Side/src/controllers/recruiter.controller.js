import Job from "../models/job.model.js";

const addjob = async (req, res) => {
    try {
        const {title, company, location, type, description, requirements, skills} = req.data;
        if(!title || !company || !location || !type || !description || !requirements || !skills) return res.status(400).json({message: "All fields required"});

        let newjob = new Job({
            title,
            company, 
            location,
            type,
            description,
            requirements,
            skills
        });
        await newjob.save();
        return res.status(200).json({message: "job added successfully"});
    } catch (error) {
        console.log("Error in adding job ", error);
    }
}


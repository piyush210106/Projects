import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import Resume from "../models/resume.model.js";
import triggerAIMatching from "../services/aiMatching.service.js";

// external jobs

const getInternalJobs = async (req, res) => {
    try {
        const userId = req.user.uid;
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }

        let jobs = await Job.find().sort({createdAt: -1});
        if(jobs.length === 0){
            return res.status(200).json({
                message: "No jobs listed",
                jobs: []
            })
        }

        return res.status(200).json({
            message: "Jobs fetched successfully",
            jobs
        })
    } catch (error) {
        console.log("Error in fetching jobs ", error);
        return res.status(400).json({message: "Error in fetching jobs"});
    }

}

const getScheduledInterviews = async (req, res) => {
    try {
        const userId = req.user.uid;
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }
        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        let interviews = await Interview
                .find({candidateId: user._id})
                .populate("jobId")
                .sort({scheduledAt: -1});
        if(interviews.length === 0){
            return res.status(200).json({
                message: "No Interviews Scheduled",
                interviews: []
            });
        }
        return res.status(200).json({
            message: "Scheduled interviews fetched successfully",
            interviews
        });

    } catch (error) {
        console.error("Error fetching interviews:", error);
        return res.status(500).json({
            message: "Internal server error"
        });

    }
}

const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.uid;
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }
        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        let applications = await Application
                .find({candidateId: user._id})
                .populate("jobId")
                .sort({createdAt: -1});

        if(applications.length === 0){
            return res.status(200).json({
                message: "No jobs listed",
                applications: []
            })
        }

        return res.status(200).json({
            message: "Applied Jobs fetched successfully",
            applications
        })

    } catch (error) {
        console.log("Error in fetching jobs ", error);
        return res.status(400).json({message: "Error in fetching jobs"});
    }
}

const joinInterviewCandidate = async (req, res) => {
    try {
        const {interviewId} = req.body;
        const userId = req.user.uid;
    
        if(!interviewId){
            return res.status(400).json({message: "InterviewId required"});
        }

        const interview = await Interview.findById(interviewId);
        if(!interview){
            return res.status(400).json({message: "Interview Not found"});
        }

        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        let role = null;
        if(interview.candidateId.toString() === user._id) role = "candidate";
        if(interview.recruiterId.toString() === user._id) role = "recruiter";

        if(!role){
            return res.status(400).json({message: "Not authorized to join room"});
        }

        const token = jwt.sign(
        {
            interviewId: interview._id,
            roomId: interview.videoCallRoom.roomId,
            role,
            userId: user._id
        },
            process.env.JWT_SECRET,
        { expiresIn: "15m" } 
        );

        return res.status(200).json({
            roomId: interview.videoCallRoom.roomId,
            signalingServerUrl: process.env.SIGNALING_SERVER_URL,
            token,
            role
        });


    } catch (error) {
        console.log("Error in joining room ",error);
    }

}

const applyJob = async (req, res) => {
    try {
        const userId = req.user.uid;
        const {jobId} = req.body;
        if(!jobId){
            return res.status(400).json({message: "Job Id required"});
        }
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }
        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        let resume = await Resume.findOne({userId: user._id});
        if(!resume){
            return res.status(400).json({message: "Error in fetching Resume"});
        }

        let newApplication = await Application.create({
            candidateId: user._id,
            jobId,
            resume: resume._id,
            status: "submitted",
        })

        triggerAIMatching({
            applicationId: newApplication._id,
            jobId,
            resumeId: resume._id
        });

        return res.status(200).json({message: "Applied for job successfully"});

    } catch (error) {
        console.log("Error in applying job ", error);
        return res.status(400).json({message: "Error in applying job"});
    }


}

export {getInternalJobs, getScheduledInterviews, getAppliedJobs, joinInterviewCandidate, applyJob};

// get userId user jobId
// get resume from Db using userId
// create application object
// call jobmatching ai service
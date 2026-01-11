import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import Interview from "../models/interview.model.js";
import { generateTokens } from "../utils/generateTokens.util.js";
import {v4 as uuidv4} from "uuid";

const addJob = async(req, res) => {
    try {
        const {idToken, job} = req.body;
        const {uid} = req.user;

        if(!idToken) return res.status(400).json({message: "Token required"});

        let user = await User.findOne({firebaseUid: uid});
        if(!user) return res.status(400).json({message: "Invalid User"});

        let newJob = await Job.create({
            title: job.title,
            type: "internal",
            company: user.company,
            department: job.department,
            description: job.description,
            requirements: job.requirements,
            qualification: job.qualification,
            location: job.location,
            salary: job.salary,
            employmentType: job.employmentType,
            postedBy: user._id,
            openings: job.openings
        })

        return res.status(200).json({message: "Job successfully added!!"});
    } catch (error) {
        console.log("Error in adding job", error);
        return res.status(400).json({message: "Error in adding job"});
    }
}

const scheduleInterview = async(req, res) => {

    try {
        const recruiterId = req.user.uid;
        const {applicationId, scheduledAtDate, duration} = req.body;

        if(!applicationId || !scheduledAtDate){
                return res.status(400).json({message: "Missing Fields"});
        }

        let application = await Application.findById({applicationId})
                                .populate("candidateId")
                                .populate("jobId");
        
        if(!application){ 
            return res.status(400).json({message: "Invalid application Id"});
        }

        if(application.jobId.postedBy.firebaseUid.toString() !== recruiterId){
            return res.satus(400).json({message: "Recruiter not owner of curr Job posting"});
        }

        const existingInterview = await Interview.findOne({ApplicationId: applicationId})
        if(existingInterview){
            return res.status(400).json({message: "Interview already exists"});
        }

        let roomId = `interview_${uuidv4()}`;

        const roomUrl = `${process.env.FRONTEND_URL}/interview/${roomId}`;

        let interview = await Interview.create({
            ApplicationId: applicationId,
            candidateId: application.candidateId._id,
            recruiterId,
            JobId: application.jobId._id,
            scheduledAt: new Date(scheduledAtDate),
            videoCallRoom: {
                roomId,
                roomUrl,
            }
        });

        return res.status(200).json({message: "Interview Scheduled"});

    } catch (error) {
        console.log("Error in scheduling interview ", error);
        return res.satus(400).json({message:"Error in scheduling interview"});
    }
}

const joinInterview = async(req, res) => {
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
            process.env.VIDEO_JWT_SECRET,
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
export {addJob, scheduleInterview, joinInterview};


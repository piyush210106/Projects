import Interview from "../models/interview.model.js";
import { v4 as uuidv4} from "uuid";

const scheduleInterview = async(req, res) => {
    try {
        const { jobId, candidateId, date } = req.body;
        const recruiterId = req.user._id;

        const interview = await Interview.create({
            jobId,
            candidate: candidateId,
            recruiter: recruiterId,
            scheduledAt: new Date(date),
            meetingId: uuidv4(),
        });
        res.status(200).json({ message: "Interview scheduled", interview });
    } catch (error) {
        console.log("Error in scheduling interview!!", error);
    }

}

export {scheduleInterview};
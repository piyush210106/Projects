import { Router } from "express";
import {getInternalJobs, 
        getScheduledInterviews, 
        getAppliedJobs, 
        joinInterviewCandidate, 
        applyJob} from "../controllers/candidate.controller.js";
import verifyIdToken from "../middleware/firebase.middleware.js";

const candidateRouter = Router();

candidateRouter.route("/getinjobs").get(verifyIdToken, getInternalJobs);
candidateRouter.route("/getexjobs").get(verifyIdToken, getInternalJobs);
candidateRouter.route("/getappliedjobs").get(verifyIdToken, getAppliedJobs);
candidateRouter.route("/joininterview").get(verifyIdToken, joinInterviewCandidate);
candidateRouter.route("/applyjob").get(verifyIdToken, applyJob);
export {candidateRouter}

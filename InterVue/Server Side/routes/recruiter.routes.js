import { Router } from "express";
import {addJob, scheduleInterview, joinInterview, getApplications, getInterviews}
 from "../controllers/recruiter.controller.js";
import verifyIdToken from "../middleware/firebase.middleware.js";

const recruiterRouter = Router();

recruiterRouter.route("/addjob").post(verifyIdToken, addJob);
recruiterRouter.route("/getapplications").post(verifyIdToken, getApplications);
recruiterRouter.route("/getinterviews").post(verifyIdToken, getInterviews);
recruiterRouter.route("/scheduleinterview").post(verifyIdToken, scheduleInterview);
recruiterRouter.route("/joininterview").post(verifyIdToken, joinInterview);

export {recruiterRouter};
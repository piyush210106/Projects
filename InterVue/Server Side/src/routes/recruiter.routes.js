import { Router } from "express";
import { verifyTokens } from "../middlewares/verifyTokens.middleware.js";
import { addjob, getappliedCandidates } from "../controllers/recruiter.controller.js";
const recrouter = Router();

recrouter.route("/addjobs").post(verifyTokens, addjob);
recrouter.route("/appliedcans").get(verifyTokens, getappliedCandidates);
recrouter.route("/chatbot").post(verifyTokens);

export { recrouter };
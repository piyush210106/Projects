import { Router } from "express";
import { verifyTokens } from "../middlewares/verifyTokens.middleware.js";
const recrouter = Router();

recrouter.route("/addjobs").post(verifyTokens);
recrouter.route("/appliedcans").get(verifyTokens);
recrouter.route("/chatbot").post(verifyTokens);
recrouter.route("/resume").get(verifyTokens);

export { recrouter };
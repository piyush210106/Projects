import { Router } from "express";
import {getexjobs, getinjobs, getappliedjobs, getselectedjobs, getmeetings} from "../controllers/candidate.controller.js";
import { verifyTokens } from "../middlewares/verifyTokens.middleware.js";

const canrouter = Router();

canrouter.route("/exjobs").get(verifyTokens, getexjobs);
canrouter.route("/injobs").get(verifyTokens, getinjobs);
canrouter.route("/appliedjobs").get(verifyTokens, getappliedjobs);
canrouter.route("/meetings").get(verifyTokens, getselectedjobs);
canrouter.route("/selectedjobs").get(verifyTokens, getmeetings);

export { canrouter };
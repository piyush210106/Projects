import { Router } from "express";

const recrouter = Router();

recrouter.route("/addjobs").post();
recrouter.route("/appliedcans").get();
recrouter.route(".chatbot").post();
recrouter.route("/resume").get();

export { recrouter };
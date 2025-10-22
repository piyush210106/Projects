import { Router } from "express";

const canrouter = Router();

canrouter.route("/exjobs").get();
canrouter.route("/injobs").get();
canrouter.route("/appliedjobs").get();
canrouter.route("/meetings").get();
canrouter.route("/selectedjobs").get();


export { canrouter };
import { Router } from "express";
import {login, signUp, logout} from "../controllers/auth.controller.js";
import verifyIdToken from "../middleware/firebase.middleware.js";
import uploadResume from "../middleware/resumeUpload.middleware.js";

const authRouter = Router();

authRouter.route("/login").post(verifyIdToken, login);
authRouter.route("/signUp").post(uploadResume.single("resume"), signUp);
authRouter.route("/logout").post(verifyIdToken, logout);
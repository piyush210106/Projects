import { Router } from "express";
import { askConsent, userLogin, completeOnboarding } from "../controllers/login.controller.js";
import { upload } from "../utils/uploadResume.util.js";

const authRouter = Router();

authRouter.get("/auth/google", askConsent);
authRouter.get("/auth/google/callback", userLogin);
authRouter.post("/login", upload.single("resume"), completeOnboarding);

export {authRouter};
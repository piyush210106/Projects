import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import { canrouter } from "./routes/candidate.routes.js";
import { recrouter } from "./routes/recruiter.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import passport from "passport";
const app = express();
app.use(cookieParser());
app.use(cors(
    {origin: "http://localhost:5173/",
    credentials: false}
));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use("/candidate", canrouter);
app.use("/recruiter", recrouter);
app.use("/api/auth", authRouter);


export default app;
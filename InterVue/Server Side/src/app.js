import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import { canrouter } from "./routes/candidate.routes.js";
import { recrouter } from "./routes/recruiter.routes.js";

const app = express();
app.use(cookieParser());
app.use(cors(
    {origin: "http://localhost:5173/",
    credentials: false}
));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/candidate", canrouter);
app.use("/recruiter", recrouter);


export default app;
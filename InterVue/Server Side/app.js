import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/auth", authRouter);
export default app;
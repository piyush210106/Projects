import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import passport from "passport";
import authRouter from "./routes/auth.route.js";
import transactionRouter from "./routes/transaction.route.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",  
  credentials: true
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use("/", authRouter);
app.use("/user", transactionRouter);
export default app;
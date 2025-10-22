import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cookieParser());
app.use(cors(
    {origin: "http://localhost:5173/",
    credentials: false}
));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



export default app;
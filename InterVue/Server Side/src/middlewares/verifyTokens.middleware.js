import jwt from "jsonwebtoken";
import { generateTokens } from "../controllers/login.controller.js";
import User from "../models/user.model.js";

const verifyTokens = async (req, res, next) => {
    try {
        let access = req.cookies?.accessToken;
        let refresh = req.cookies?.refreshToken;
        
        if(!access){
            return res.status(400).json({message: "Access token missing"});
        }

        try {
            let decoded = jwt.verify(access, process.env.ACCESS_TOKEN_SECRET);
            let user = await User.findById(decoded.id);
            req.userId = user._id;
            next();
        } catch (error) {
            if (error.name !== "TokenExpiredError") {
            return res.status(403).json({ message: "Invalid access token" });
            }
        }
         if(!refresh){
            return res.status(401).json({ message: "No refresh token" });
        }
        try {
            let decoded = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);
            let user = await User.findById(decoded.id);
            if(!user || refresh !== user.refreshtoken)
                return res.status(400).json({message: "Invalid Refresh Token"});
            
            const {access_token: nnewAccesstoken,refresh_token: newRefreshToken} = generateTokens(user);
            user.refreshtoken = newRefreshToken;
            await user.save();

            res.cookie("accessToken", newAccesstoken, { httpOnly: true, secure: false,sameSite: "none" });
            res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: false, sameSite: "none" });

            req.userId = user._id;
            next();
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Token check failed", error });
    }
} 

export {verifyTokens};
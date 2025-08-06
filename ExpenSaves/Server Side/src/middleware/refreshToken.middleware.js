import jwt from "jsonwebtoken"
import { generateTokens } from "../controllers/user.controller.js"
import User from "../models/user.model.js"

const refreshTokens = async (req, res, next) => {
    try {
    let access_token = req.cookies.accessToken;
    let refresh_token = req.cookies.refreshToken;

    if(!access_token) return res.status().json("Access Token Missing");

    try {
        let decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        let user = await User.findById(decoded.id);
        req.userId = user._id;
        next();
    } catch (error) {
        if(error != "TokenExpiredError") 
            return res.status().json({message: "error", error});
    }

    if(!refresh_token) return res.status().json({message: "Refresh Token Missing"});

    let decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    let user = await user.findById(decoded.id);
    if(!user || refresh_token !== user.refreshToken)
        return res.status().json({message: "Invalid Refresh Token"});

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: false });
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: false });

    req.userId = user._id;
    next();
    
    } catch (error) {
        return res.status(500).json({ message: "Token check failed", error });
    }
}

export {refreshTokens}
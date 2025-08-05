import passport from "passport";
import User from "../models/user.model.js"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
}, 
    async (accessToken, refreshToken, profile, next) => {
        try {
          let user = await User.findOne({google_id: profile.id});

          if(!user){
            user = await User.create({
                google_id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                profile_pic: profile.photos[0].value
            });
          }

          return next(null, user);
        } catch (error) {
            return next(error, null);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));


const generateTokens = (user) => {
    let accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
    let refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "10d"});

    return {accessToken, refreshToken};
}

const askConsent = (req, res, next) => {
    console.log("google route hit");
    passport.authenticate( "google", {scope: ["profile", "email"]})(req, res, next);
    
}

const userLogin = (req, res, next) => {
    passport.authenticate("google", {session: false},
        async (err, user) => {
        const {accessToken, refreshToken} = generateTokens(user);

            user.refreshToken = refreshToken;
            await user.save();

            res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
            })
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
            })
            res.redirect("http://localhost:5173/user/home");
        }
    )(req, res, next);
}

const userLogout = async (req, res) => {
    const accesstoken = req.cookie.access_Token;
    const refreshtoken = req.cookie.refresh_Token;

    if(refreshtoken){
        const decoded = jwt.verify(refreshtoken, process.jwt.REFRESH_TOKEN_SECRET);
        await User.findByIdAndUpdate(decoded.id, {refreshToken: null});
    }
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.sendStatus(200);
}

const TokenRefresh = async (req, res) => {
    const token = req.cookie.refresh_Token;
    if(!token) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if(!user || user.refreshToken !== token) return res.sendStatus(403);
        const {newAccessToken, newRefreshToken} = generateTokens(user).accessToken;
        user.refreshToken = newRefreshToken;
        await user.save();

        res
        .cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
        })
        .cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false,
        })

    } catch (error) {
        return res.sendStatus(403);
    }
}

export {askConsent, userLogin, userLogout, TokenRefresh}
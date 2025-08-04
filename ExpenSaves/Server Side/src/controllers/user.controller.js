import passport from "passport";
import User from "../models/user.model.js"
import GoogleStrategy from "passport-google-oauth20"
import jwt from "jsonwebtoken"


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, 
    async (accessToken, refreshToken, Profile, next) => {
        try {
          const user = await User.find({google_id: Profile.id});

          if(!user){
            user = await User.create({
                google_id: Profile.id,
                email: Profile.emails[0].value,
                name: Profile.name,
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
    let accessToken = jwt.sign({id: user.google_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
    let refreshToken = jwt.sign({id: user.google_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "10d"});

    return {accessToken, refreshToken};
}

const askConsent = () => {
    passport.authenticate( "google", {scope: ["profile", "email"]});
}

const userLogin = () => {
    passport.authenticate("google", {session: false},
        async (req, res) => {
        const {accessToken, refreshToken} = generateTokens(req.user);

            req.user.refreshToken = refreshToken;
            await req.user.save();

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
    );
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
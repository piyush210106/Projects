import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Resume from "../models/resume.model.js";
import { parseResume } from "../utils/parseResume.util.js";

dotenv.config({
    path: "./.env"
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async(accessToken, refreshToken, profile, next) => {

        try {
            let user = await User.findOne({"google.google_id": profile.id})
            if(!user){
                user = new User({
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    avatar: profile.photos?.[0]?.value,
                    google: {
                        google_id: profile.id,
                        googleRefresh_token: refreshToken,
                    }
                })
            }
            else{
                user.google.googleRefresh_token = refreshToken;
                await user.save();
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
    let access_token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30min"});
    let refresh_token = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "10d"});
    return {access_token, refresh_token};
}

const askConsent = (req, res, next) => {
    console.log("google hitt");
    passport.authenticate( "google", {
            session: false,
            scope: [
                'profile',
                'email',
                "https://www.googleapis.com/auth/calendar.events"
            ], 
            accessType: 'offline', 
            prompt: 'consent'
    })(req, res, next);
}

const userLogin = (req, res, next) => {
    passport.authenticate("google", {
            session: false,
            scope: [
                'profile',
                'email',
                "https://www.googleapis.com/auth/calendar.events"
            ], 
            accessType: 'offline', 
            prompt: 'consent'
    },
        async (err, user, info) => {
            if(err) return next(err, null);
            if(user.role == null){
                const tempToken = jwt.sign(
                { googleProfile: user },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10m" }
            );
            res.cookie("tempToken", tempToken, {
                httpOnly: true,
                secure: false,
                maxAge: 10 * 60 * 1000 
            })
            .redirect("http://localhost:5173/login");
            return;
        }

            const {access_token, refresh_token} = generateTokens(user);

            user.refreshtoken = refresh_token;
            await user.save();

            res
            .cookie("refreshToken", refresh_token, {
                httpOnly: true,
                secure: false,
                sameSite: "none"
            })
            .cookie("accessToken", access_token, {
                httpOnly: true,
                secure: false,
                sameSite: "none"
            })
            if (user.role === "Candidate") {
            return res.redirect("http://localhost:5173/candidate/exjobs");
            } else if (user.role === "Recruiter") {
            return res.redirect("http://localhost:5173/recruiter/dashboard");
            }

        }
    )(req, res, next);
}

const completeOnboarding = async (req, res) => {
    console.log("Onboarding hit");
    const { tempToken } = req.cookies;
    
    if (!tempToken) return res.status(401).json({ message: "No temp token" });
    
    try {
        const decoded = jwt.verify(tempToken, process.env.ACCESS_TOKEN_SECRET);
        const profile = decoded.googleProfile;
        const user = await User.findById(profile._id);
        if(!user) return res.status(400).json({message: "User not found!!"});
        const { role, linkedin } = req.body;
        const resumeURL = req.file?.path;
        
        user.role = role;
        user.linkedIn = linkedin;
    if (resumeURL) {
      let {text, structured} = await parseResume(resumeURL);
      const resume = new Resume({
        candidate: user._id,
        fileUrl: resumeURL,
        fileName: "resume.pdf",
        text,
        structured
      });
      user.resume = resume._id; 
      await resume.save();
    }

    const { access_token, refresh_token } = generateTokens(user);
    user.refreshtoken = refresh_token;
    await user.save();

    const redirectUrl = user.role === "Candidate" 
      ? "/candidate/exjobs"
      : "/recruiter/addjobs";
     return res
      .cookie("accessToken", access_token, { httpOnly: true })
      .cookie("refreshToken", refresh_token, { httpOnly: true })
      .json({ 
        success: true,
        user: user,
        redirectUrl: redirectUrl
      });
  } catch (err) {
    console.log("Onboarding error ",err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export {askConsent, userLogin, completeOnboarding, generateTokens};

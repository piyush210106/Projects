import admin from "../config/firebase.config.js";
import User from "../models/user.model.js";
import {bucket} from "../config/firebase.config.js";
import Resume from "../models/resume.model.js";
import triggerAIprocessing from "../services/resumeParsing.service.js";

const login = async(req, res) => {
    try {
        const idToken = req.body;
        const { uid, email } = req.user;

        let user = await User.findOne({firebaseUid: uid});

        if(!user){
            return res.status(400).json({message: "Sign Up First"});
        }

        res.cookie("session", idToken, {
            httpOnly: true,
            secure: true,        
            sameSite: "none",    
            maxAge: 24 * 60 * 60 * 1000, 
        });

        return res.status(200).json({
            message: "Login successful",
            role: user.role
        });
    } catch (error) {
        console.log("error in login", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}

const signUp = async(req, res) => {
    try {
        const {uid, email} = req.user;
        const {user_profile, idToken} = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Resume is required" });
        }
        
        let existingUser = await User.findOne({firebaseUid: uid});

        if(existingUser) return res.status(400).json({message: "User already exists"});

        const filePath = `resumes/${uid}/resume-${Date.now()}.pdf`;
        const file = bucket.file(filePath);

        await file.save(req.file.buffer, {
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        const [resumeUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2030",
        });

        let user = await User.create({
            firebaseUid: uid,
            email,
            role: user_profile.role,
            profile: {
                name: user_profile.name,
                resumeUrl,
                linkedinUrl: user_profile.linkedinUrl,
                company: user_profile.company,
                position: user_profile.position,
                department: user_profile.department
            }
        });

        let resume = await Resume.create({
            userId: user._id,
            firebaseUid: uid,
            url: resumeUrl,
            storagePath: filePath,
        });

        

        res.cookie("session", idToken, {
            httpOnly: true,
            secure: true,        
            sameSite: "none",    
            maxAge: 24 * 60 * 60 * 1000, 
        });

        triggerAIprocessing({
            resume_id: resume._id.toString(), 
            resumeUrl: resume.url,
            firebaseUid: uid
        });
        
        return res.status(200).json({
            message: "Sign Up successfull",
            role: user.role
        });

    } catch (error) {
        console.log("Error in sign up", error);
        return res.status(400).json({message: "Error in signUp"});
    }
}

const logout = async (req, res) => {
    res.clearCookie("session", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return res.status(200).json({message: "logOut successfull"});
}

export {login, signUp, logout};

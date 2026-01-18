import {admin} from "../config/firebase.config.js";

const verifyIdToken = async (req, res, next) => {
    try {
        console.log("Middleware started");
        let token = null;
        if (req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        else if (req.cookies?.session) {
            token = req.cookies.session;
        }
        
        if(!token) return res.status(400).json({message: "Token Required"});
    
        let decoded = await admin.auth().verifyIdToken(token);
    
        req.user = { uid: decoded.uid, email: decoded.email };
        next();
    } catch (error) {
        console.log("Invalid session", error);
        return res.status(400).json({message: "Invalid Session"});
    }
}

export default verifyIdToken;
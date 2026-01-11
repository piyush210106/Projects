import jwt from "jsonwebtoken";

const generateTokens = ({roomId, userId, role}) => {
    return jwt.sign(
        {roomId, userId, role},
        process.env.JWT_SECRET,
        {expireIn: "10h"}
    );
}

export {generateTokens};
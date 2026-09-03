const jwt=require("jsonwebtoken");
require("dotenv").config()
const generateToken=(payload)=>{
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );
};
const verifyToken=(Token)=>{
    return jwt.verify(
        Token,
        process.env.JWT_SECRET
    );
};
module.exports={
    generateToken,
    verifyToken
}
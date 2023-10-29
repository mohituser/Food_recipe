
const User=require("../models/schema");
const jwt=require("jsonwebtoken");
// const user = require("../models/user");
exports.isLoggedIn=async(req,res,next)=>{
    const token=req.cookies.token ;
    if(!token){
        return next(new customError("Login first to access this page",401));
    }
    // now decoding the token
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id)
    next();
}
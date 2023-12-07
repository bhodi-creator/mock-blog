const jwt = require("jsonwebtoken")
require("dotenv").config();

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
try {
    if(token){
        const decoded =jwt.verify(token,process.env.SECRET_KEY)
        req.payload = decoded.userId
           //console.log(userId)
            next()
    }else{
        return res.sendStatus(400).json({msg:"please Login"})
    }
} catch (error) {
    res.status(400).json({"error":error})
}
};

module.exports={
    auth
}
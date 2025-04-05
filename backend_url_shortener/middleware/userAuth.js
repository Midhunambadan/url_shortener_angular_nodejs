import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const authenticateToken=async (req,res,next)=>{

    const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided, Authorization denied' });
  }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        res.status(403).json({message:'Invalid or Expired Token'})
    }
}

export default authenticateToken
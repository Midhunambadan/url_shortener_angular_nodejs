import bcrypt from "bcrypt";
import shortid from "shortid";
import User from "../models/userModel.js";
import Url from "../models/urlModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const home = async (req, res) => {
  try {
  } catch (error) {}
};

const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    // console.log('new user------',newUser);
    
    let data = await newUser.save();

    // console.log('---------------------------------------',data)

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email })    

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );    

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: "Login success",
      data: user,
      token,
    });
    
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      // httpOnly: true,
      sameSite: "Lax",
      secure: true,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};

const createUrl = async (req, res) => {
  try {
    
    let url = req.body.url;

    const userId = req.user?.userId;
    
    if(!url) return res.status(400).json({error:'URL is required'})


    let shortId = shortid();

    const newUrl = await Url.create({
      user: userId,
      shortId: shortId,
      redirectURL: url,
      visitedHistory: [], 
    })

    // console.log('newUrl',newUrl);
    
    return res.status(200).json({
      success: true,
      message: "Heyyy",
      data: newUrl,
    });
  } catch (error) {
    res.status(401).json({ message: "Error occur" });
  }
};

const userProfile = async (req, res) => {
  try {
  
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile fetched", data: user });
  } catch (error) {
    console.error("Error in userProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const redirectUrl= async(req,res)=>{
  try {
    const shortId=req.params.shortId
    console.log('shortid----------',shortId);

    const entry=await Url.findOneAndUpdate({shortId},{$push:{
        visitedHistory:{
          timestamp:Date.now(), 
        }
    }})

    res.redirect(entry.redirectURL)

    
  } catch (error) {
    
  }
}

const getAllURL = async (req, res) => {
  try {
    console.log('getAllURL--------');
    
    const userId = req.user.id;
    console.log('userID',userId)
    const urls = await Url.find({ user: userId }).sort({ createdAt: -1 });
    
    res.status(200).json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  home,
  signup,
  login,
  createUrl,
  userProfile,
  logout,
  redirectUrl,
  getAllURL
};


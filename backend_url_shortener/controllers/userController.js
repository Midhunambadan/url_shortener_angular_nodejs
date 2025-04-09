import bcrypt from "bcrypt";
import shortid from "shortid";
import User from "../models/userModel.js";
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

    let data = await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });

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

    res.cookie("token", token, {
      // httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "Lax",
    });

    // console.log('token-------------',token)

    res.status(200).json({ message: "Login success", data: user,token });
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
    let shortId = shortid(8);
    console.log('short id',shortId);

    return res.status(200).json({
      success: true,
      message: "Heyyy",
      data: url,
    });
  } catch (error) {
    res.status(401).json({ message: "Error occur" });
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log('uesridddd',req.user)
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log(user);
    res.status(200).json({ message: "User profile fetched", data: user });
  } catch (error) {
    console.error("Error in userProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  home,
  signup,
  login,
  createUrl,
  userProfile,
  logout,
};

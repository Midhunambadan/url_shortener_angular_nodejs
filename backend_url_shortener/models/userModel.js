import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  urls: [
    {
      originalUrl: String,
      
      shortUrl: {
        type: String,
        unique: true,
      },

      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userModel);

export default User;

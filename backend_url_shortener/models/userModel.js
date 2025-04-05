import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
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
        sparse: true,
      },

      createdAt: { type: Date, default: Date.now },
    },
  ],
});


export default mongoose.model('User', userModel)

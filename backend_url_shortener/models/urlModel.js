import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    shortId: { type: String, required: true, unique: true },

    redirectURL: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
    visitedHistory: [{ timestamp: { type: Number } }],
  },
  { timestamp: true }
);

export default mongoose.model("Url", urlSchema);

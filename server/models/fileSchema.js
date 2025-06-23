import mongoose from "mongoose";

// Embedded Comment Schema
const commentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    commentedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Prevent auto _id in embedded docs
);

// Main Note Schema
const noteSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);

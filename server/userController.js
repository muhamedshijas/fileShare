import User from "./models/userModel.js";
import Note from "./models/fileSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ userName: name }).lean();
  if (existingUser) {
    return res.json({ success: false, message: "UserName  Already Exist " });
  }
  const emailExist = await User.findOne({ email: email }).lean();
  if (emailExist) {
    return res.json({ success: false, message: "Email Already Exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName: name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
}

export async function login(req, res) {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName }).lean();
  console.log(user);
  if (!user) {
    return res.json({ success: false, message: "user not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ success: false, message: "Invalid password" });
  }

  // Success response
  const token = jwt.sign({ user: true, id: user._id }, process.env.JWT_SECRET);

  return res
    .cookie("usertoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    })
    .json({ success: true });
}

export async function checkAuth(req, res) {


  const token = req.cookies.usertoken;
  if (!token) return res.json({ loggedIn: false });

  const verifiedJwt = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne(
    { _id: verifiedJwt.id },
    { password: 0 }
  ).lean();

  if (!user) return res.json({ loggedIn: false });

  return res.json({ loggedIn: true, user });
}
export async function logout(req, res) {
  res
    .cookie("usertoken", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .json({ message: "logged out", error: false });
  console.log("logged in");
}

export async function fileUpload(req, res) {
  try {
    const {
      title,
      subject,
      semester,
      tags,
      fileUrl,
      uploadedBy, // You may extract this from auth middleware in real apps
    } = req.body;

    if (!fileUrl || !subject || !semester || !Array.isArray(tags)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const note = new Note({
      title,
      subject,
      semester,
      tags,
      fileUrl,
      uploadedBy,
    });

    await note.save();

    return res.status(201).json({
      success: true,
      message: "Note uploaded successfully",
      note,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
}
export async function getAllFiles(req, res) {
  const allFiles = await Note.find().populate("uploadedBy").lean();
  return res.json({ success: true, allFiles });
}
export async function getfileById(req, res) {
  const id = req.params.id;

  const file = await Note.findOne({
    _id: new mongoose.Types.ObjectId(id),
  }).populate("uploadedBy");

  console.log(file);
  return res.json({ success: true, file });
}

export async function likeNote(req, res) {
  const { noteId, id } = req.body;

  const note = await Note.findById(noteId);
  if (!note)
    return res.status(404).json({ success: false, message: "Note not found" });

  const index = note.likes.indexOf(id);
  if (index === -1) {
    note.likes.push(id); // Like
  } else {
    note.likes.splice(index, 1); // Unlike
  }

  await note.save();
  return res.json({ success: true, likesCount: note.likes.length });
}

export const addComment = async (req, res) => {
  try {
    const { noteId, userId, text } = req.body;

    if (!noteId || !userId || !text) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found." });
    }

    note.comments.push({
      user: userId,
      text: text.trim(),
    });

    await note.save();

    return res.status(200).json({ success: true, message: "Comment added." });
  } catch (err) {
    console.error("Error adding comment:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Note ID is required" });
    }

    // Find the note by ID and populate the user data for each comment
    const note = await Note.findById(id).lean();

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    // Format comments (optional: to clean output)
    const formattedComments = note.comments.map((comment) => ({
      user: comment.user || "Unknown",
      text: comment.text,
      commentedAt: comment.commentedAt,
    }));

    return res.status(200).json({ success: true, comments: formattedComments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getMyUploads = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    
    const notes = await Note.find({ uploadedBy: userId });
    
    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMyLikedNotes = async (req, res) => {
  try {
    console.log("likes");
    
    const userId = req.params.id;
    const likedNotes = await Note.find({ likes: userId });
    res.json({ success: true, notes: likedNotes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

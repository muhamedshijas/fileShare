import express from "express";
import {
  addComment,
  checkAuth,
  fileUpload,
  getAllFiles,
  getComments,
  getfileById,
  getMyLikedNotes,
  getMyUploads,
  likeNote,
  login,
  logout,
  signup,
} from "./userController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/check", checkAuth);
router.get("/logout", logout);
router.post("/upload", fileUpload);
router.get("/allfiles", getAllFiles);
router.get("/getfile/:id", getfileById);
router.post("/like/", likeNote);
router.post("/addcomment", addComment);
router.get("/getcomments/:id", getComments);
router.get("/getmyfiles/:id", getMyUploads);
router.get("/getmylikedfiles/:id", getMyLikedNotes);

export default router;

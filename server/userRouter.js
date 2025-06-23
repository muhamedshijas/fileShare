import express from "express";
import {
  checkAuth,
  fileUpload,
  getAllFiles,
  getfileById,
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

export default router;

//shijushijas157

//I5Qt4ApziFPRt7t9

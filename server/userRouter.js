import express from "express";
import { checkAuth, login, logout, signup } from "./userController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/check", checkAuth);
router.get("/logout", logout);

export default router;

//shijushijas157

//I5Qt4ApziFPRt7t9

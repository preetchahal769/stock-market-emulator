import express from "express";
import {
  getProfile,
  login,
  logout,
  refreshToken,
  signup,
  verificationMail,
  verifyOtp,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, getProfile);
router.post("/refresh-token", refreshToken);
router.post("/verificationMail", protectRoute, verificationMail);
router.post("/verifyOtp", protectRoute, verifyOtp);
export default router;

import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
} from "../controllers/userController.js";

import {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/refresh", refreshLimiter, refreshAccessToken);
router.post("/logout", logout);

export default router;

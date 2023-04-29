import express from "express";
import {
  Login,
  Register,
  getMyDetails,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", Register);
router.post("/login", Login);
router.post("/logout", logout);
router.get("/me",isAuthenticated,getMyDetails);
export default router;

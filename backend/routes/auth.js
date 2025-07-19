import express from "express";
import { signin, signout, signup } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", verifyToken, signout);

export default router;

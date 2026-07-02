import { logout, signin, signinForm, signup, signupForm } from "../controller/auth.js";
import express from "express";
import { upload } from "../services/multer.js";

const router = express.Router();

router
.post('/signup',upload.single("avatar"),signup)
.get("/signup",signupForm)

router
.post('/signin',signin)
.get('/signin',signinForm)


router.get('/logout',logout)
export default router;
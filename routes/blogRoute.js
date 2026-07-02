import express from "express";
import { auth } from "../middleware/auth.js";
import { createBlog, getAllBlogs, getBlog, getNewBlog } from "../controller/blog/blog.js";
import { upload } from "../services/multer.js";
import { addComment } from "../controller/user/commentControoler.js";

const router = express.Router();

router.use(auth)
router.get("/", getAllBlogs)         
 
router.get("/new", getNewBlog)

router.get("/:id", getBlog)   

router.post("/new", upload.single("coverImage"), createBlog)

router.post("/:id/comment", addComment);

export default router;
import { Blog } from "../../models/blog.js";
import { Comment } from "../../models/comment.js";
import { cloudinaryUpload } from "../../services/cloudinary.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username avatar fullname")
      .sort({ createdAt: -1 });
 
    return res.render("blog/index", { blogs, error: null });
  } catch (err) {
    console.error("getAllBlogs error:", err);
    return res.render("blog/index", { blogs: [], error: "Failed to load blogs." });
  }
};


export const getNewBlog = (req, res) => {
  return res.render("blog/new", { error: null, formData: {} });
};


export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "username avatar fullname");
 
    const comments = await Comment.find({blog:req.params.id})
    .populate("author")

    console.log(comments)
  
    if (!blog) {
      return res.render("error", { message: "Blog post not found." });
    }
 
    return res.render("blog/detail", { blog,comments });
  } catch (err) {
    console.error("getBlog error:", err);
    return res.render("error", { message: "Failed to load blog post." });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
 
    if (!title || !content) {
      return res.render("blog/new", {
        error: "Title and content are required.",
        formData: { title, content },
      });
    }
 
    if (title.trim().length < 5) {
      return res.render("blog/new", {
        error: "Title must be at least 5 characters.",
        formData: { title, content },
      });
    }
 
    let coverImage = {
      url: "/images/uploads/default-cover.png",
      public_id: "default-cover",
    };
 
    if (req.file) {
      const uploadResult = await cloudinaryUpload(`public/images/uploads/${req.filename}`)
      coverImage = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    await Blog.create({
      title: title.trim(),
      content,
      coverImage,
      author: req.user._id,  
    });
 
    return res.redirect("/blog");
  } catch (err) {
    console.error("createBlog error:", err);
    return res.render("blog/new", {
      error: "Something went wrong. Please try again.",
      formData: req.body,
    });
  }
};


import { Blog } from "../../models/blog.js";

 
// ─── GET /user/dashboard ──────────────────────────────────────────────────
export const userDashboard = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .sort({ createdAt: -1 });
 
    return res.render("user/dashboard", { blogs, error: null });
  } catch (err) {
    console.error("getDashboard error:", err);
    return res.render("user/dashboard", { blogs: [], error: "Failed to load your posts." });
  }
};
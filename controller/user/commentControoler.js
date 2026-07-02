import { Comment } from "../../models/comment.js";
import { Blog } from "../../models/blog.js"; 

// ─── POST /blog/:id/comment ───────────────────────────────────────────────
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;

    if (!content || content.trim() === "") {
      return res.redirect(`/blog/${blogId}#comments`);
    }

    await Comment.create({
      author: req.user._id,
      content: content.trim(),
      blog: blogId,
    });

    return res.redirect(`/blog/${blogId}#comments`);
  } catch (err) {
    console.error("addComment error:", err);
    return res.redirect(`/blog/${req.params.id}#comments`);
  }
};

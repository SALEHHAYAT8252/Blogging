import mongoose  from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
      type: String,
      required:true,
      trim: true,
    },
     content: {
      type: String,
      required:true,
    },
     coverImage: {
      url: {
        type: String,
        default: "/images/uploads/default-cover.png",
      },
      public_id: {
        type: String,
        default: `default-cover-${Date.now()}`,
      },
 
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },

},{
    timestamps:true
})

export const Blog = mongoose.model("Blog",blogSchema);
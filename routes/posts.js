const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postText: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
      },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the current date and time
    },
    likes: {
      type: Number,
      default: 0,
    },

  }
);

// Create the Post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    dp: {
      type: String, // Assuming you will store a URL or path to the display picture
      default: "",
    },
  }
);

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const plm = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

const userSchema = new mongoose.Schema(
  {
    username: String,
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    password : String,
    fullname : String,
    email : String,
    dp : String,
  }
);

// Create the User model
userSchema.plugin(plm);
const User = mongoose.model("User", userSchema);

module.exports = User;

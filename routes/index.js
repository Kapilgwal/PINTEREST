var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async function (req, res, next) {
  let createduser = await userModel.create({
    username: "kapil",
    password: "kapil",
    posts: [],
    email: "kapil@gmail.com",
    fullname: "kapil gwal",
  });
  res.send(createduser);
});

router.get("/createpost", async function (req, res, next) {
  let createdpost = await postModel.create({
    postText: "This is a  time to new beginnings",
    user: "66e6dd8c768ec736e0efa1ea",
  });
  let user = await userModel.findOne({ _id: "66e6dd8c768ec736e0efa1ea" });
  user.posts.push(createdpost._id);
  await user.save();
  res.send("done");
});

router.get('/alluserposts',async function(req,res,next){
    let user = await userModel.findOne({_id : "66e6dd8c768ec736e0efa1ea"})
    .populate('posts');
    res.send(user);
})

module.exports = router;

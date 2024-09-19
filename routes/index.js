const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("./users");
const postModel = require("./posts");
const upload = require("./multer");

// Passport configuration
passport.use(new LocalStrategy(userModel.authenticate()));

// Home page route
router.get("/", (req, res) => {
  res.render("index");
});

router.post('/upload', isLoggedIn ,upload.single('file'),async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded" });
  }

  //  res.status(200).json({ message: "File uploaded successfully!", file: req.file });
  const user = await userModel.findOne({username : req.session.passport.user});
  const postData = await postModel.create({
    image : req.file.filename,
    postText : req.body.fileCaption,
    user: user._id
  });
  user.posts.push(postData._id);
  await user.save();
  res.send("done");
});

// Profile page route (requires authentication)
router.get("/profile", isLoggedIn,async (req, res) => {
  const user = await userModel.findOne({username : req.session.passport.user}).populate("posts");
  
  console.log(user);
  res.render("profile",{user});
});

// Login page route
router.get("/login", (req, res) => {
  res.render("login", { error: req.flash("error") });
});

// Feed page route
router.get("/feed", (req, res) => {
  res.render("feed");
});

// Registration route
router.post("/register", (req, res) => {
  const { username, email, fullname, password } = req.body;
  const newUser = new userModel({ username, email, fullname });

  userModel
    .register(newUser, password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      });
    })
    .catch((err) => {
      req.flash("error", err.message);
      res.redirect("/register");
    });
});

// Login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

// Middleware to check if user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;

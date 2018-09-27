const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const uploadCloud = require("../config/cloudinary.js");
const facebook = require('passport-facebook').Strategy;

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let imgName = "";
  let imgPath = "";

  if (username === "" || password === "") {
    res.render("auth/signup", {
      message: "Debes indicar un nombre de usuario y contraseña"
    });
    return;
  }

  if (!req.file) {
    imgName = "user_placeholder.png";
    imgPath = "/images/user_placeholder.png";
  } else {
    imgName = req.file.originalName;
    imgPath = req.file.url;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "El nombre de usuario ya existe" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      avatarName: imgName,
      avatarPath: imgPath
    });

    newUser
      .save()
      .then(() => {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/dashboard");
        });
      })
      .catch(err => {
        res.render("auth/signup", { message: "Algo falló ☹️" });
      });
  });
});

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook", { 
  successRedirect: '/dashboard',
  failureRedirect: '/login' }));

router.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
});

module.exports = router;

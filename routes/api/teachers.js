const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// sounditems from seed
const seedSoundItems = require("../../seed/soundItems");

// Load Teacher model
const Teacher = require("../../models/Teacher");

// @route   GET api/teachers/test
// @descr   Tests teachers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "test is working" }));

// @route   GET api/teachers/register
// @descr   Register teacher
// @access  Public
router.post("/register", (req, res) => {
  Teacher.findOne({ email: req.body.email }).then(teacher => {
    if (teacher) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newTeacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        soundItems: []
      });
      // load all of the sounditems
      seedSoundItems.forEach(item => {
        newTeacher.soundItems.push(item);
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTeacher.password, salt, (err, hash) => {
          if (err) throw err;
          newTeacher.password = hash;
          newTeacher
            .save()
            .then(teacher => res.json(teacher))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/teachers/login
// @descr   Register login
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Teacher.findOne({ email: req.body.email }).then(teacher => {
    if (!teacher) {
      return res.status(400).json({ email: "teacher not found" });
    }
    bcrypt.compare(password, teacher.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: teacher.id, name: teacher.name };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

// @route   GET api/teachers/current
// @descr   Return current teacher
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
      // soundItems: req.user.soundItems
    });
  }
);
module.exports = router;

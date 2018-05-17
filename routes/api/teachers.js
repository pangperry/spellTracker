const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load Teacher model
const Teacher = require("../../models/Teacher");

// @route   GET api/teachers/test
// @descr   Tests teachers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Teachers works" }));

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
        password: req.body.password
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

module.exports = router;

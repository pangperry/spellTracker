const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// sounditems from seed
const seedSoundItems = require("../../seed/soundItems");

// Load Teacher model
const Teacher = require("../../models/Teacher");

// @route   GET api/teachers/test
// @descr   Tests teachers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "test is working" }));

// @route   POST api/teachers/register
// @descr   Register teacher
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

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
      // console.log(seedSoundItems);
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

// @route   POST api/teachers/login
// @descr   LOGIN, sets user and soundItem categories etc
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  Teacher.findOne({ email: req.body.email }).then(teacher => {
    if (!teacher) {
      return res.status(400).json({ email: "teacher not found" });
    }

    bcrypt.compare(password, teacher.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: teacher.id,
          name: teacher.name
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
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
    });
  }
);

// @route   GET api/teachers/current/sounditems
// @descr   Return current teacher
// @access  Private
router.get(
  "/current/sounditems",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Teacher.findById(req.user._id)
      .then(teacher => {
        if (!teacher.soundItems) {
          errors.nosoundItems = "teacher has no soundItems";
          return res.status(404).json(errors);
        }
        res.json(teacher.soundItems);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/teachers/students
// @descr Get teacher's students
// @access Private
router.get(
  "/students",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Teacher.findById(req.user._id)
      .then(teacher => {
        res.json({ students: teacher.students });
      })
      .catch(err => console.log(err));
  }
);

// @route   POST api/teachers/student
// @descr   Add student to teacher
// @access  Private
router.post(
  "/student",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Teacher.findById(req.user._id).then(teacher => {
      teacher.students.push({ name: req.body.name });
      teacher
        .save()
        .then(teacher => {
          return res.json({ name: teacher.name, students: teacher.students });
        })
        .catch(err => console.log(err));
    });
  }
);

// @route   DELETE api/teachers/student
// @descr   DELETE student from teacher
// @access  Private
router.delete(
  "/student/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Teacher.findById(req.user._id).then(teacher => {
      const index = teacher.students
        .map(student => student._id.toString())
        .indexOf(req.params.id);
      teacher.students.splice(index, 1);
      teacher
        .save()
        .then(teacher =>
          res.json({ name: teacher.name, students: teacher.students })
        )
        .catch(err => console.log(err));
    });
  }
);

// TODO: add validation for students
module.exports = router;

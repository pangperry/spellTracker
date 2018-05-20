const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const teachers = require("./routes/api/teachers");
const students = require("./routes/api/students");
const words = require("./routes/api/words");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/teachers", teachers);
app.use("/api/students", students);
app.use("/api/words", words);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on ${port}`));

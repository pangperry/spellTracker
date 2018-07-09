const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Teacher = mongoose.model("teachers");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Teacher.findById(jwt_payload.id)
        .then(teacher => {
          if (teacher) {
            return done(null, teacher);
          }
          return done(null, false);
        })
        .catch(err => console.log(e));
    })
  );
};

//TODO(potential): passport points req.user at whatever I pass into done (see above).
//for consistency, I might want to change my Teacher model to User model

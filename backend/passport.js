const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
//const mongoose = require("mongoose");
const Centre = require('./models/Centre_model');
require('dotenv').config();
const keys = "secret";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        Centre.findById(jwt_payload.id)
        .then(centre => {
          if (centre) {
            return done(null, centre);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
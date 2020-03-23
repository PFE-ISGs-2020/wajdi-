const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
//const mongoose = require("mongoose");
const Client = require('./models/Client_model');
require('dotenv').config();
const keys = "secret";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys
module.exports = passportClient => {
  passportClient.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        Client.findById(jwt_payload.id)
        .then(client => {
          if (client) {
            return done(null, client);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
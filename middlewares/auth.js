const express = require("express");
const passport = require("passport");
const app = express();
const jwt = require('jsonwebtoken');
const jwtKey = require('../jwtKey.json');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}

// Extracts the JWT from the header of the request
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = jwtKey.key;

// console.log(opts);

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("Processing JWT payload for token content:");
    console.log(jwt_payload);
  
    /* Here you could do some processing based on the JWT payload.
    For example check if the key is still valid based on expires property.
    */
    console.log("Accesses the JWT auth");
    const now = Date.now() / 1000;
    if(jwt_payload.exp > now) {
        console.log("Passed an if statement in JWT auth");
        done(null, jwt_payload.user);
    } else /* expired */ {
        console.log("Did not pass an if statement in JWT auth");
        done(null, false);
    }
  }));

//   passport.use("register", new JwtStrategy())
const passport = require("passport");
const jwtKey = require('../jwtKey.json');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {}

// Extracts the JWT from the header of the request
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = jwtKey.key;

module.exports = passport.use(new JwtStrategy(options, (payload, done) => {
    console.log("Processing JWT payload for token content:");
    console.log(payload);
  
    /* Here you could do some processing based on the JWT payload.
    For example check if the key is still valid based on expires property.
    */
    console.log("Accesses the JWT auth");
    const now = Date.now() / 1000;
    if(payload.exp > now) {
        console.log("Passed an if statement in JWT auth");
        console.log(payload);
        done(null, payload);
    } else /* expired */ {
        console.log("Did not pass an if statement in JWT auth");
        done(null, false);
    }
  }));
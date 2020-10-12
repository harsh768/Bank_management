const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for facebook login
passport.use(new facebookStrategy({
        clientID: "2958578721095211", 
        clientSecret: "85401d9c2629fd77372b75271194f58c", 
        callbackURL: "http://localhost:8000/user/auth/facebook/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in facebook strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user facebook strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);    //the mongoDB object ID (_id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true
},
    function (accessToken, refreshToken, profile, done) {

        console.log({
            accessToken: accessToken,
            refreshToken: refreshToken,
            profile: profile,
            cb: done,
            profileEmails: profile.emails
        })

        User.findOne(
            { googleId: profile.id }
        ).then(existingUser => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User({
                    googleId: profile.id
                }).save().then(user => {
                    return done(null, user);
                });
            }
        });

    }
));


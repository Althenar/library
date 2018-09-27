'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const UserService = require('../server/services/user');


passport.serializeUser((user,done) =>{
    done(null,user.id);
})

passport.deserializeUser((id,done) =>{
    UserService.read.getById(id).then((user)=>{
        done(null,user);
    })

})

passport.use(new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile, done) => {

        UserService.read.getByIdByProvider(profile.id)
            .then((currentUser) => {
                    if (currentUser) {
                        console.log("User is saved already");
                        done(null,currentUser);
                    } else {
                        const user = {
                            name: profile.displayName,
                            provider: profile.provider,
                            idByProvider: profile.id,
                        };
                        UserService.create(user);
                        done(null,user);
                    }

                }
            )}
));
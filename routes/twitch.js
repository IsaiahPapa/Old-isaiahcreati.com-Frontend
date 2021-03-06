// twitch.js - twitch auth route module

const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const passport       = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request        = require('request');
const cookieSession = require('cookie-session');

const config = require('../src/_cfg.js');
const mongo = require('../src/mongo.js');

router.use(cookieSession({
    name: 'session',
    keys: [config.TWITCH_SESSION_SECRET],

    // Cookie Options
    //maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days hours
    maxAge: 60 * 60 * 1000
}))

/*
*   Passport.js
*/

//router.use(session({secret: secrets.twitchSessionSecret, resave: false, saveUninitialized: false}));
router.use(passport.initialize());
router.use(passport.session());

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
    var options = {
        url: 'https://api.twitch.tv/helix/users',
        method: 'GET',
        headers: {
            'Client-ID': config.TWITCH_CLIENT_ID,
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer ' + accessToken
        }
    };
    
    request(options, function (error, response, body) {
        //console.log(response); //Check header type here and see if data is json then do.. 
        try{
            if (response && response.statusCode == 200) {
                done(null, JSON.parse(body.trim()));
            } else {
                done(JSON.parse(body.trim()));
            }
        }catch(e){
            console.log(e);
        }

    });
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('twitch', new OAuth2Strategy({
        authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
        tokenURL: 'https://id.twitch.tv/oauth2/token',
        clientID: config.TWITCH_CLIENT_ID,
        clientSecret: config.TWITCH_SECRET,
        callbackURL: config.TWITCH_CALLBACK_URL,
        state: true
    },
    function(accessToken, refreshToken, profile, done) {

        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;

        var twitch =  profile["data"][0];
        twitch["access_token"] = accessToken;
        twitch["refresh_token"] = refreshToken;

        var uuid4 = uuidv4();

        //mongo.updateOrCreateUser(id, login, display_name, description, profile_image, profile_offline, view_count, accessToken, refreshToken, broadcaster_type, uuid4);
        mongo.updateOrCreateUser({
            twitch: twitch,
            uuid4: uuid4,
        });

        done(null, profile);
    }
));

// Set route to start OAuth link, this is where you define scopes to request
router.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read channel:read:redemptions' }));

// Set route for OAuth redirect
router.get('/auth/twitch/callback', passport.authenticate('twitch', { failureRedirect: "/" }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;

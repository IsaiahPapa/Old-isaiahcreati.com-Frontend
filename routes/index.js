// index.js - / route module

const express = require('express');
const router = express.Router();

const mongo = require('../src/mongo.js');
const templates = require('../src/templates.js');
const config = require('../src/_cfg.js');
const channel_points = require('./channel_points.js');
const codmw19 = require('./codmw.js');
const admin = require('./admin.js');


// Home page route
router.get('/', function(req, res) {
    res.locals.title = "Custom Channel Points, Twitch & Youtube Resources, and Accessibility";
    res.locals.desc = "Isaiah Creati's personal website. Channel Point Text to Speech (TTS), Sounds, and Ideas for Twitch Affiliates and Partners along with IsaiahCreati Twitch stream & Youtube video resources.";
    req.session.returnTo = req.originalUrl;

    if(req.session && req.session.passport && req.session.passport.user) {
        var data = req.session.passport.user;
        res.render('index', {page_name: 'home',  userPassport: data});
    } else {
        res.render('index', {page_name: 'home', userPassport: false});
    }
});

router.get('/dashboard', async function(req, res){
    res.locals.title = "Dashboard";
    req.session.returnTo = req.originalUrl;
    var userData = false;
    var user_profile = false;
    var user_rewards = false;
    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
        user_profile = await mongo.getUserDataByID(userData["data"][0]["id"]);
        user_rewards = await mongo.getRewardsByID(userData["data"][0]["id"]);
    }
    res.render('dashboard', {page_name: 'dashboard', userPassport: userData, user_profile: user_profile, user_rewards: user_rewards, templates: templates});
});

router.get('/terms-of-service', async function(req, res){
    res.locals.title = "Terms of Service";
    req.session.returnTo = req.originalUrl;

    var userData = false, user_profile = false, secret = false;
    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
        user_profile = await mongo.getUserDataByID(userData["data"][0]["id"]);
    }
    res.render('terms-of-service', {page_name: 'terms-of-service', userPassport: userData, user_profile: user_profile });
});
/*
router.get('/premium', async function(req, res){
    
    res.locals.title = "Premium";
    req.session.returnTo = req.originalUrl;

    var userData = false, user_profile = false, secret = false;
    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
        user_profile = await mongo.getUserDataByID(userData["data"][0]["id"]);
    }
    res.render('premium', {page_name: 'premium', userPassport: userData, user_profile: user_profile });
});
*/
router.get('/donate', async function(req, res){
    
    res.locals.title = "Donate";
    req.session.returnTo = req.originalUrl;

    var userData = false, user_profile = false, secret = false;
    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
        user_profile = await mongo.getUserDataByID(userData["data"][0]["id"]);
    }
    res.render('donate', {page_name: 'donate', userPassport: userData, user_profile: user_profile });
});
router.get('/alerts', async (req, res) => {res.status(200).send(JSON.stringify({params: req.params,query: req.query}));});
router.get('/alerts/v1', async (req, res) => {res.status(200).send(JSON.stringify({params: req.params,query: req.query}));});
router.get("/alerts/v1/:alertKey", async function(req, res){

    var userData, alertKey, userData;

    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
    } else {
        userData = false;
    }

    if(typeof req.params.alertKey !== "undefined"){

        //The only data that should be sent is the alert key, username, and roomID
        alertKey = req.params.alertKey;

        userFromDatabase = await mongo.getUserDataByUUID(alertKey);
        userData = {};
        userData["login"] = userFromDatabase["twitch"]["login"];
        userData["id"] = userFromDatabase["twitch"]["id"];

    }

    res.render("alerts", {alertKey: alertKey, userFromDatabase: userData, version: config.version});

});

router.use('/channel-points', channel_points);

router.use('/codmw19', codmw19);

router.use('/admin', admin);

module.exports = router;

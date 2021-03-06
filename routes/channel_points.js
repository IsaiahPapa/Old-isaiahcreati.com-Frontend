// channel_points.js - /channel-points route module

const express = require('express');
const router = express.Router();

var creati_tts_voices;
const mongo = require('../src/mongo.js');
mongo.connectToServer( async function( err, client ) {
    if (err) console.log(err);
    creati_tts_voices =  await mongo.getVoices();
});

router.get('/', async function(req, res){
        
    res.locals.title = "Twitch Channel Points";
    
    var userData;
    req.session.returnTo = req.originalUrl;

    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
    } else {
        userData = false;
    }
    
    res.render('channel-points', {page_name: 'channel-points', userPassport: userData});
});

router.get('/tts-voices', async function(req, res){
    
    res.locals.title = "Channel Points - TTS Voices";
    req.session.returnTo = req.originalUrl;

    var userData;
    var creati = {};
    creati["voices"] = creati_tts_voices;

    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
    } else {
        userData = false;
    }
    
    res.render('tts-voices', {page_name: 'channel-points', creati: creati, userPassport: userData});
});

module.exports = router;
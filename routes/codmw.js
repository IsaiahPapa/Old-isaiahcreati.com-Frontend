// codmw.js - /codmw19 route module

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.locals.title = "Call of Duty: Modern Warfare 2019 Stuff";
    res.locals.desc = "Resources that Isaiah Creati has made for Modern Warfare 2019.";
    req.session.returnTo = req.originalUrl;

    var userData;

    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
    } else {
        userData = false;
    }
    
    
    res.render('codmw', {page_name: 'codmw', userPassport: userData});
});

router.get('/modern-warfare-random-weapon-generator', function(req, res){
    res.locals.title = "Random Weapon & Attachment Generator Modern Warfare 2019 ";
    res.locals.desc = "Random primary and secondary weapon generator with attachments, random perk generator, and random equipment generator for Modern Warfare 2019, Call of Duty";
    req.session.returnTo = req.originalUrl;

    var userData;
    
    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
    } else {
        userData = false;
    }
    
    res.render('modern-warfare-random-weapon-generator', {page_name: 'codmw', userPassport: userData});
});

module.exports = router;
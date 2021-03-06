
// admin.js - /admin route module

const express = require('express');
const router = express.Router();

const mongo = require('../src/mongo.js');
const index = require('../index.js');

router.get('/', async function(req, res){
    res.locals.title = "Admin";
    req.session.returnTo = req.originalUrl;

    var userData;
    var userFromDatabase;

    if(req.session && req.session.passport && req.session.passport.user) {
        userData = req.session.passport.user;
        userFromDatabase = await mongo.getUserDataByID(userData["data"][0]["id"]);
    } else {
        userData = false;
        userFromDatabase = false;
    }
    
    res.render('admin', {page_name: 'admin', adminWsData: false /*await websocket.getAdminData()*/, userPassport: userData, userFromDatabase: userFromDatabase});
});

var Filter = require('bad-words'), filter = new Filter();
router.post('/send-tts', (req, res) => {
    let found = false;
    if(req.session && req.session.passport && req.session.passport.user) {
        if(req.session.passport.user["data"][0]["login"] === "isaiahcreati"){
            if(req.body.admin_tts_user.length !== 0){
                if(req.body.admin_tts_message.length !== 0){
                    var message = req.body.admin_tts_message;
                    //var userDbData = mongo.getUserDataByLogin(req.body.admin_tts_user.toLowerCase());    

                    mongo_collection_rewards.findOne({_id: req.body.admin_tts_user.toLowerCase()}).then(item => {

                        for(const reward of item["rewards"]){
                            if(msg_rewardId.trim() === reward["reward_id"].trim()){
                                switch(reward["type"]){
                                    case "tts":
            
                                        index.ioNotifications.to(item["uuid4"]).emit('play tts', {
                                            voice: reward["settings"]["voice_name"],
                                            volume: parseInt(reward["settings"]["volume"]),
                                            input: msg_text,
                                            version: config.version
                                        });
                                        found = true;
                                        res.sendStatus(201);
                                }
                            }
                        }
                    });
                }
            }
        }
    }
    if(!found){
        res.sendStatus(404)
    }
});
router.post('/get-point-handler', (req, res) => {
    if(req.session && req.session.passport && req.session.passport.user) {
        if(req.session.passport.user["data"][0]["login"] === "isaiahcreati"){
            if(req.body.admin_handler_id){
                //res.sendStatus(201);
                //res.send(websocket.getPointHandlerByHandlerId(parseInt(req.body.admin_handler_id)))
            }
        }
    }
});
module.exports = router;
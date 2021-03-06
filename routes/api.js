// api.js - api route module

const express = require('express');
const router = express.Router();
const axios = require("axios");
const request         = require('request');
const { body, validationResult } = require('express-validator');

var proxyList, creati_tts_voices;
const aws = require('../src/aws.js');
const mongo = require('../src/mongo.js');
var firebase = require('../src/firebase.js');

mongo.connectToServer( async function( err, client ) {
    if (err) console.log(err);
    creati_tts_voices =  await mongo.getVoices();
    await mongo.getProxyList().then((proxies)=>{
        proxyList = proxies;
    });
} );

const api_socket = require('./api_socket.js');
router.use('/socket', api_socket);

const api_paypal = require('./api_paypal.js');
router.use('/paypal', api_paypal);

//TTS Api Router
router.get('/tts', async (req, res) => {
    res.status(200).send(
        JSON.stringify({
            status: 200,
            message: "OK",
            params: req.params,
            query: req.query
        })
    );
});

router.get('/tts/:alertKey', async (req, res) => {
    
    var errorList = [];
    if(req.params.alertKey){
        if(!req.query.voice){
            errorList.push("No Voice Specified");
        }else if(!req.query.text){
            errorList.push("No text Specified");
        }
    }else{
        errorList.push("No Key Specified");
    }
    //If we have all the data, then...
    if(!errorList.length){
        var data = await mongo.geRewardDataByUUID(req.params.alertKey.trim());
        if(data){
            try {
                for(const reward of data["rewards"]){

                        switch(reward["type"]){
                            case "tts":     
                                //User defined Character Limit
                                if(!reward["settings"]["aws"]["isUsingAws"]){
                                    console.logonly(`${data["_id"]} called the new TTS. ${req.query.voice}, ${req.query.text}`);
                            
                                    if(proxyList){
            
                                        proxy = proxyList[Math.floor(Math.random() * proxyList.length)]
                                        //https://translate.google.com/translate_tts?ie=UTF-8&tl=hu&client=tw-ob&q=A%20kutya%20szavunk%20eredet%C3%A9re%20t%C3%B6bb%20felt%C3%A9telez%C3%A9s%20van
                                        //?ie=UTF-8&
                                        //tl=${hungarian} //hu is hungarian
                                        //&client=tw-ob
                                        //&q=${encodeURIComponent(req.query.text)}
                                        return new Promise(resolve => { request({
                                                'method': 'POST',
                                                'url': `https://tts.isaiahcreati.com?voice=${req.query.voice}&text=${encodeURIComponent(req.query.text)}`,
                                            },
                                            function (error, response, body) {
                                                try{
                                                    if (!error) {
                                                        resolve(JSON.parse(body));
                                                    }else{
                                                        console.log(error);
                                                    }
                                                }catch(e){
                                                    console.log(e);
                                                }
            
                                            });
                                        }).then(value => {
                                            //Get URL from SL and process it, then send to user. 
                                            if(value["success"] && value["speak_url"]){
                                                request({
                                                    'method': 'GET',
                                                    'url': value["speak_url"],
                                                    //proxy: `http://${proxyUsername}:${proxyPass}@${proxyHost}:${proxyPort}`,
                                                    encoding: null
                                                },
                                                function (error, response, body) {
                                                    if (error){
                                                        console.log(error);
                                                    }
                                                    //res.set('content-type', 'audio/mp3');
                                                    //res.set("Access-Control-Allow-Origin", "https://www.isaiahcreati.com");
                                                    //res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                                                    //res.set('Access-Control-Allow-Methods', 'GET');
                                                    //res.status(200).send(body);
                                                }).pipe(
                                                    res.set('content-type', 'audio/mpeg'),
                                                    res.status(200)
                                                );
                                            }else{
                                                console.logonly(`Couldnt get speak_url value: ${value["speak_url"]}`)
                                            }
                                        });
                                        
                                    }
                                }else{
                                    var buffer = await aws.getSpeechBuffer({
                                        text: req.query.text,
                                        voice: req.query.voice,
                                        access_key_id: reward["settings"]["aws"]["access_key_id"],
                                        access_key_secret: reward["settings"]["aws"]["access_key_secret"]
                                    });
                                    res.set('content-type', 'audio/mpeg');
                                    res.status(200);
                                    res.send(buffer);
                                }
                        } 
                    
                }
            }catch (e) {
                res.status(404).send(
                    JSON.stringify({
                        params: req.params,
                        query: req.query,
                        error: e.message
                    })
                );
            }
        }else{
            errorList.push("UUID not Found in Database");
            res.status(404).send(
                JSON.stringify({
                    params: req.params,
                    query: req.query,
                    error: errorList
                })
            );
        }
    }else{
        res.status(404).send(
            JSON.stringify({
                params: req.params,
                query: req.query,
                error: errorList
            })
        );
    }
});

//Dashboard Api Router
router.post('/dashboard/save-rewards', (req, res) => {

    if(req.session && req.session.passport && req.session.passport.user) {
        
        var error = false;
        let errors = [];
        var userDbData = mongo.getUserDataByID(req.session.passport.user["data"][0]["id"]);
        if(userDbData){
            userDbData.then(item => { 
                try {
                    var rewards = [];
                    for(const ajax_reward of JSON.parse(req.body.rewards)){
                        if(ajax_reward["type"] === "tts"){
                            let voice_code = "";
                            let found = 0;
                            for(const [key, voice] of Object.entries(creati_tts_voices)){
                                if(ajax_reward["settings"]["voice_name"].toLowerCase().trim() === voice["name"].toLowerCase().trim()){
                                    if(voice["required_role"] === "supporter" && !item["rank"].includes("supporter")){
                                        found = 2;
                                    }else{
                                        //Voice found and is good
                                        found = 1;
                                        voice_code = voice["name"];
                                    }
                                }
                            }
                            if(found !== 1){
                                error = true;
                                switch(found){
                                    case 0:
                                        errors.push("Voice not found! Please refer to the list of voices. CaSe SeNSitive");
                                        break;
                                    case 2:
                                        errors.push("That voice is for Supporters only!")
                                        break;
                                }
                            }
                            rewards.push({
                                reward_id: ajax_reward["reward_id"],
                                type: "tts",
                                settings: mongo.getModuleSettings().tts({
                                    voice_name: ajax_reward["settings"]["voice_name"],
                                    voice_code: voice_code,
                                    char_limit: ajax_reward["settings"]["char_limit"],
                                    volume: ajax_reward["settings"]["volume"],
                                    filter: {
                                        enabled : ajax_reward["settings"]["filter"]["enabled"],
                                        placeholder : ajax_reward["settings"]["filter"]["placeholder"],
                                        word_list : ajax_reward["settings"]["filter"]["word_list"]
                                    }
                                })
                            });
                        }else if(ajax_reward["type"] === "showemote"){
                            rewards.push({
                                reward_id: ajax_reward["reward_id"],
                                type: "showemote",
                                settings: mongo.getModuleSettings().showemote({
                                    size: ajax_reward["settings"]["size"],
                                    showtime: ajax_reward["settings"]["showtime"],
                                    fadetime: ajax_reward["settings"]["fadetime"]
                                })
                            });
                        }else if(ajax_reward["type"] === "sound"){
                            //10-4-20 522PM: Set the upload_list to the ajax_reward["settings"]. I am only allowing single sound uploads for now. No one used the list. 
                            rewards.push({
                                reward_id: ajax_reward["reward_id"],
                                type: "sound",
                                settings: mongo.getModuleSettings().sound({
                                    type: "single",
                                    upload_list: [ajax_reward["settings"]]
                                })
                            });
                        }else if(ajax_reward["type"] === "video"){
                            //if(item["rank"].includes("supporter")){
                            rewards.push({
                                reward_id: ajax_reward["reward_id"],
                                type: "video",
                                settings: mongo.getModuleSettings().video({
                                    type: "single",
                                    upload_list: [ajax_reward["settings"]]
                                })
                            });              
                            //}
                        }else if(ajax_reward["type"] === "runcommand"){
                            var reward = {
                                reward_id: ajax_reward["reward_id"],
                                type: "runcommand",
                            };
                            switch(ajax_reward["settings"]["command"]){
                                case "magicball": {
                                    reward["settings"] = mongo.getModuleSettings().runcommand({
                                        command: "magicball",
                                    })
                                    break;
                                }
                                case "fortune": {
                                    reward["settings"] = mongo.getModuleSettings().runcommand({
                                        command: "fortune",
                                    })
                                    break;
                                }
                                case "followage": {
                                    reward["settings"] = mongo.getModuleSettings().runcommand({
                                        command: "followage",
                                    })
                                    break;
                                }
                                case "timeout": {
                                    reward["settings"] = mongo.getModuleSettings().runcommand({
                                        command: "timeout",
                                        features: {
                                            length: ajax_reward["settings"]["features"]["length"] 
                                        } 
                                    })
                                    break;
                                }
                                case "slowmode": {
                                    reward["settings"] = mongo.getModuleSettings().runcommand({
                                        command: "slowmode",
                                        features: {
                                            length: ajax_reward["settings"]["features"]["length"],
                                            duration: ajax_reward["settings"]["features"]["duration"]
                                        } 
                                    })
                                    break;
                                }
                                case "submode": {
                                    reward["settings"] = mongo.getModuleSettings().runcommand({
                                        command: "submode",
                                        features: {
                                            length: ajax_reward["settings"]["features"]["length"] 
                                        } 
                                    })
                                    break;
                                }
                                case "emotemode": {
                                    reward["settings"] = mongo.getModuleSettings().runcommand({
                                        command: "emotemode",
                                        features: {
                                            length: ajax_reward["settings"]["features"]["length"] 
                                        } 
                                    })
                                    break;
                                }
                                default: {
                                    console.log("/api/dashboard/save-rewards error runcommand type not found\n" + ajax_reward)
                                    break;
                                }
                            }
                            rewards.push(reward);
                        }
                    }

                    if(!error){
                        mongo.updateRewards({res: res, profile_id: req.session.passport.user["data"][0]["id"], rewards: rewards});
                    }else{
                        res.status(422).send(errors);
                    }
                } catch (e) {
                    console.log("error" + e);
                    res.status(422).send(e);
                }
            }).catch(err => {
                console.error(err)
            });
        }
    } else {
        res.status(422).send("Session Expired. You need to re-login");
    }

});
router.post('/dashboard/join-part', (req, res) => {

    if(req.session && req.session.passport && req.session.passport.user) {
        
        var error = false;

        var bot = JSON.parse(req.body.bot);
        var userDbData = mongo.getUserDataByID(req.session.passport.user["data"][0]["id"]);

        if(userDbData){
            userDbData.then(item => {
                var id = req.session.passport.user["data"][0]["id"];
                var type = "DEFAULT";

                var user = {
                    id: item["twitch"]["id"],
                    login: item["twitch"]["login"],
                    access_token: item["twitch"]["access_token"],
                    refresh_token: item["twitch"]["refresh_token"],
                    topic: "channel-points-channel-v1." + item["twitch"]["id"]
                };

                try{
                    if(bot.command === "PART"){
                        axios.post('http://127.0.0.1:7010/api/queue', {
                            twitch: user,
                            command:"PART",
                            init: false,
                        }).then(function (response) {
                            //Data good
                        }).catch(function (error) {
                            if(typeof error.code === "string"){
                                if(error.code === "ECONNREFUSED"){
                                    error = `Tried to queue ${twitch.login} but API is DOWN`;
                                    console.log(`Tried to queue ${twitch.login} but :7010/api/chat/queue API is DOWN`);
                                }else{
                                    error = `${error.code}, ${error.response}`;
                                }
                            }else{
                                error = `${error.code}, ${error.response}`;
                            }
                        });

                        type = "PART";

                    }else if(bot.command === "JOIN"){
                        axios.post('http://127.0.0.1:7010/api/queue', {
                            twitch: user,
                            command:"JOIN",
                            init: false,
                        }).then(function (response) {
                            //Data good
                            console.log(response.data);
                        }).catch(function (error) {
                            if(typeof error.code === "string"){
                                if(error.code === "ECONNREFUSED"){
                                    error = `Tried to queue ${twitch.login} but API is DOWN`;
                                    console.log(`Tried to queue ${twitch.login} but :7010/api/chat/queue API is DOWN`);
                                }else{
                                    error = `${error.code}, ${error.response}`;
                                }
                            }else{
                                error = `${error.code}, ${error.response}`;
                            }
                        });
                        type = "JOIN";
                    }else{
                        //console.log("IsStreamer state has not changed");
                        //errors.push("Error trying to listen/unlisten to topic")
                        //Server Client JOIN PART Mismatch. Try and force part user, then force join. 
                        axios.post('http://127.0.0.1:7010/api/queue', {
                            twitch: user,
                            command:"PART",
                            init: false,
                        }).then(function (response) {
                            //Data good
                        }).catch(function (error) {
                            if(typeof error.code === "string"){
                                if(error.code === "ECONNREFUSED"){
                                    error = `Tried to queue ${twitch.login} but API is DOWN`;
                                    console.log(`Tried to queue ${twitch.login} but :7010/api/chat/queue API is DOWN`);
                                }else{
                                    error = `${error.code}, ${error.response}`;
                                }
                            }else{
                                error = `${error.code}, ${error.response}`;
                            }
                        });
                        setTimeout(()=> {
                            axios.post('http://127.0.0.1:7010/api/queue', {
                                twitch: user,
                                command:"JOIN",
                                init: false,
                            }).then(function (response) {
                                //Data good
                            }).catch(function (error) {
                                if(typeof error.code === "string"){
                                    if(error.code === "ECONNREFUSED"){
                                        error = `Tried to queue ${twitch.login} but API is DOWN`;
                                        console.log(`Tried to queue ${twitch.login} but :7010/api/chat/queue API is DOWN`);
                                    }else{
                                        error = `${error.code}, ${error.response}`;
                                    }
                                }else{
                                    error = `${error.code}, ${error.response}`;
                                }
                            });
                        }, 1000);
                        type = "PART";
                    }
                }catch(e){
                    console.log(`Error trying to ${bot.command} ${item["botHasConnected"]} with id=${id} ${e}`)
                    error = `Error trying to ${bot.command} ${item["botHasConnected"]} with id=${id} ${e}`;
                }

                if(!error){
                    res.status(200).send({
                        success: true,
                        msg: `Queued to ${type} channel ${item["twitch"]["login"]}`
                    });
                }else{
                    console.log(error);
                    res.status(400).send({
                        success: false,
                        msg: error
                    });   
                }

            }).catch(err => {
                console.error(err);
                res.status(422).send({
                    success: false,
                    msg: `Couldn't find user in database!`
                });
            });
        }

    } else {
        res.status(422).send({
            success: false,
            msg: `Session Expired. You need to re-login`
        });
    }

});

router.post('/dashboard/upload', firebase.multer.single('file'), (req, res) => {
    if(req.session && req.session.passport && req.session.passport.user && req.user.data) {
        try{
            
            let file = req.file;
            file["user_id"] = JSON.parse(req.body.meta)["user_id"];
            if (file) {

                var size_megabyte =  file["size"] / 1024 / 1024;
                var limits_megabyte = {
                    video: 10.0,
                    sound: 5.0,
                };
                
                //10-5-20 530PM: Add support for mimetype audio/ogg, but you have to look the alert.ejs howler stuff to make sure it plays in the browser
                if(file["mimetype"] === "audio/mpeg"){
                    if(size_megabyte < limits_megabyte["sound"]){
                        firebase.uploadFileToStorage(file).then((success) => {
                            var _file = {};
                            _file["url"] = success;
                            _file["name"] = file["originalname"];
                            
                            res.status(200).send({message: 'success', status:200, file:_file }); 
                        }).catch((error) => {
                            console.error(error);
                        });
                    }else{
                        res.status(500).send({message: `File size too large! Must be less than ${limits_megabyte["sound"]}MB`, status:500 }); 
                    }
                }else if(file["mimetype"] === "video/webm" || file["mimetype"] ===  "video/mp4"){
                    if(size_megabyte < limits_megabyte["video"]){
                        firebase.uploadFileToStorage(file).then((success) => {
                            var _file = {};
                            _file["url"] = success;
                            _file["name"] = file["originalname"];
                            
                            res.status(200).send({message: 'success', status:200, file:_file }); 
                        }).catch((error) => {
                            console.error(error);
                        });
                    }else{
                        res.status(500).send({message: `File size too large! Must be less than ${limits_megabyte["video"]}MB`, status:500 }); 
                    }
                }else{
                    res.status(500).send({message: 'File type must be MP4 or WebM!', status:500 }); 
                }
            }
        }catch(e){

        }

    }
});

module.exports = router;
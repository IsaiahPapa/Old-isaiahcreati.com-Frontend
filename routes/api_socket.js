// api_socket.js - socket hanlding for websocket and pubsub. 

const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const chalk = require('chalk');

const index = require('../index.js');
const mongo = require('../src/mongo.js');
const parser = require("../src/parsers.js");

const config = require('../src/_cfg.js')
const emoji = require("node-emoji");

/*Text To Speech Helpers*/
const Filter = require('bad-words');

let mongo_collection_rewards = false, mongo_collection_profile = false, mongo_collection_fortunes = false;


mongo.connectToServer( async function( err, client ) {
    if (err) console.log(err);

    mongo_collection_rewards = mongo.getRewardsCollection();
    mongo_collection_profile = mongo.getProfileCollection();
    mongo_collection_fortunes = mongo.getFortunesCollection();

});

async function sendPrivateMessage({message, login}){
    try{
        const response = await axios.post(config.API_BACKEND + '/api/chat/send', {
            message: message,
            login: login,
        });
        console.log(`${response.data.status}, ${response.data.message}`);
    }catch(e){
        console.log(e);
    }

}

router.post('/chat', async function(req, res){

    let msg = req.body.msg;
    //console.log(msg);
    res.sendStatus(200);
    
    var msg_displayName = parser.parseVariable(";", msg, "display-name");
    var msg_roomId = parser.parseVariable(";", msg, "room-id");
    var msg_isMod = parser.parseVariable(";", msg, "mod");
    var msg_roomName = msg.substring(msg.search("PRIVMSG #") + ("PRIVMSG #").length, parser.findCharPosition(":", msg, msg.search("PRIVMSG #")) -1);
    var msg_rewardId = parser.parseVariable(";", msg, "custom-reward-id");
    var msg_text = msg.substring(parser.findCharPosition(":", msg, msg.search("PRIVMSG #") ) + 1);
    var msg_emotes = parser.parseVariable(";", msg, "emotes");

    if (msg_isMod === "1") {
        //Is mod
        msg_isMod = true;
    } else {
        //Is not mod
        msg_isMod = false;
        if(typeof msg_displayName === "string"){
            if(msg_displayName.toLowerCase() === msg_roomName.toLowerCase()){
                //For some reason the broadcaster has mod=0? so we have to check in here
                msg_isMod = true;
            }
        }
 
    }

    //
    //  Check Point rewards.
    //       -> Here are the chat commands. In the chat bot there are chat commands and then the reward ID.   
    //
    if(msg_rewardId){
        let rewards = await mongo_collection_rewards.findOne({_id: msg_roomId});

        index.ioNotifications.to(rewards["uuid4"]).emit('bind', {id: msg_rewardId});

        for(const reward of rewards["rewards"]){
            if(msg_rewardId.trim() === reward["reward_id"].trim()){
                switch(reward["type"]){
                    case "tts":

                        //User defined Character Limit
                        if(reward["settings"]["char_limit"]){
                            msg_text = msg_text.substring(0, parseInt(reward["settings"]["char_limit"]));
                        }
                        
                        //Twitch Chat bug
                        if(msg_text == "."){
                            msg_text = "";
                        }
                        
                        //Text to Speech Filter
                        if(JSON.parse(reward["settings"]["filter"]["enabled"]) && reward["settings"]["filter"]["word_list"] !== ""){
                            //I am writing my own, but this one will do for now. It works really well in some places but sucks ass in others.
                            var customFilter = new Filter({ placeHolder: reward["settings"]["filter"]["placeholder"], emptyList: true }); //list: rewards["modules"]["tts"]["filter"]["word_list"].split(" ")
                            customFilter.addWords(... reward["settings"]["filter"]["word_list"].split(" "));
                            msg_text = customFilter.clean(msg_text)
                        }

                        //Send Noti to user
                        index.ioNotifications.to(rewards["uuid4"]).emit('play tts', {voice: reward["settings"]["voice_name"], volume: parseInt(reward["settings"]["volume"]), input: msg_text, version: config.version});
                        console.log(rewards["uuid4"], {voice: reward["settings"]["voice_name"], volume: parseInt(reward["settings"]["volume"]), input: msg_text, version: config.version})

                        //logger.log.info("[Chat " + _this.id + "] " + msg_displayName + " redeemed TTS in " + rewards["_id"]);
                        console.log(msg_displayName + " redeemed TTS in " + rewards["_id"]);

                        break;
                        
                    case "showemote":  

                        var emotes = {};

                        if(msg_emotes){
                            msg_emote_first = msg_emotes.substring(0, parser.findCharPosition(":", msg_emotes, 0));
                            emotes["isTwitch"] =  true;
                            emotes["url"] = "https://static-cdn.jtvnw.net/emoticons/v1/" + msg_emote_first + "/2.0";
                        
                        }else if(typeof emoji.find(msg_text.substring(0, 2)) !== "undefined"){ //https://thekevinscott.com/emojis-in-javascript/ Yea, the length of an emoji is 2. Imagine
                            if(Object.keys(emoji.find(msg_text.substring(0, 2))).length > 0){
                                emotes["isEmoji"] = true;
                                emotes["emoji"] = emoji.find(msg_text.substring(0, 2));
                            }
                        }else{
                            emotes["isTwitch"] =  false;
                            emotes["isEmoji"] = false;

                            emotes["name"] = msg_text;
                        }

                        //Send noti to user
                        index.ioNotifications.to(rewards["uuid4"]).emit('showemote', emotes);

                        break;

                    default:
                        //index.ioNotifications.to(rewards["uuid4"]).emit('bind', {id: msg_rewardId});
                        break;
                }
            }

        }
    }

    //
    //  
    //  CHAT COMMANDS.
    //      -> Here are the chat commands. In the chat bot there are chat commands and then the reward ID.   
    //
    //
    if(msg_isMod){
        switch(msg_text.trim()){
            case "!skiptts":{
                let reward = await mongo_collection_rewards.findOne({"_id": msg_roomId});
                index.ioNotifications.to(reward["uuid4"]).emit('skip tts');
                break;
            }
        }
    }
});

router.post('/pubsub', async function(req, res){
    res.sendStatus(200);
    let mMessage = req.body;
    try{
        if(mMessage.type === "reward-redeemed"){
            //console.log(JSON.stringify(mMessage))
            let channelId = mMessage.data.redemption["channel_id"];
            let redemptionName = mMessage.data.redemption.user["display_name"];
            let redemptionTitle = mMessage.data.redemption.reward["title"];
            let redemptionCost = mMessage.data.redemption.reward["cost"];
            
            let redemptionUserInput = mMessage.data.redemption["user_input"]; //There is an issue where the string goes past 500, the char limit and it errors.
            if(typeof redemptionUserInput === "string"){
                redemptionUserInput = redemptionUserInput.substring(0, 499)
                if(redemptionUserInput === ""){
                    redemptionUserInput = false;
                }
            }else{
                redemptionUserInput = false;
            }

            let reward_id = mMessage.data.redemption.reward["id"];
            let redemptionImageUrl = "";

            //This throws an error. It keeps saying that the 2x is undefined. I am going to have to loop through this and figure it all out
            /*
            if(typeof mMessage.data.redemption.reward.image === "null" || typeof mMessage.data.redemption.reward.image === undefined){
                redemptionImageUrl = mMessage.data.redemption.reward.default_image["url_2x"];
            }else{
                redemptionImageUrl = mMessage.data.redemption.reward.image["url_2x"];
            }
            */

            let user_reward = await mongo_collection_rewards.findOne({_id: channelId});

            if(user_reward){
                index.ioNotifications.to(user_reward["uuid4"]).emit('bind', {id: reward_id, title: redemptionTitle, cost: redemptionCost, image: redemptionImageUrl});
                for(const reward of user_reward["rewards"]){
                    if(reward_id.trim() === reward["reward_id"].trim()){
                        switch(reward["type"]){
                            case "sound":
                                if(reward["settings"]["type"] === "single"){                                                        
                                    //Send noti to user
                                    for (let [key, value] of Object.entries(reward["settings"]["upload_list"])) {
                                        index.ioNotifications.to(user_reward["uuid4"]).emit('play sound', value);
                                        break;
                                    }

                                }else if(reward["settings"]["type"] === "multi" && typeof redemptionUserInput === "string" && redemptionUserInput !== ""){
                                    /*
                                    for (let [key, value] of Object.entries(reward["settings"]["upload_list"])) {
                                        if(redemptionUserInput.toLowerCase().trim() === value["name"].toLowerCase().trim()){
                                            index.ioNotifications.to(user_reward["uuid4"]).emit('play sound', value);
                                            break;
                                        }
                                    }
                                    */

                                }
                                break;

                            case "video":
                                if(reward["settings"]["type"] === "single"){                                                        
                                    //Send noti to user
                                    for (let [key, value] of Object.entries(reward["settings"]["upload_list"])) {
                                        index.ioNotifications.to(user_reward["uuid4"]).emit('play video', value);
                                        break;
                                    }

                                }else if(reward["settings"]["type"] === "multi" && typeof redemptionUserInput === "string" && redemptionUserInput !== ""){
                                    for (let [key, value] of Object.entries(reward["settings"]["upload_list"])) {
                                        if(redemptionUserInput.toLowerCase().trim() === value["name"].toLowerCase().trim()){
                                            index.ioNotifications.to(user_reward["uuid4"]).emit('play video', value);
                                            break;
                                        }
                                    }
                                }
                                break;
                            case "runcommand":

                                let profile = await mongo_collection_profile.findOne({"twitch.id": channelId});
                                switch(reward["settings"]["command"]){
                                    case ("followage"):{
                                        if(typeof redemptionName ==="string" && typeof profile["twitch"]["login"] === "string"){
                                            axios.get(`https://api.2g.be/twitch/followage/${profile["twitch"]["login"].trim()}/${redemptionName.toLowerCase().trim()}?format=mwdhms`).then(response => {
                                                try{
                                                    if(typeof response.data === "string"){
                                                        axios.post(config.API_BACKEND + "/api/chat/send", {
                                                            message: `PRIVMSG #${profile["twitch"]["login"].trim()} :${response.data}`,
                                                            login: profile["twitch"]["login"].trim()
                                                        })
                                                        .then(function (response) {
                                                            console.log(`${response.data.status}, ${response.data.message}`);
                                                        })
                                                        .catch(function (error) {
                                                            console.log(`${error.code}, ${error.config.data}`);
                                                        });
                                                    }
                                                }catch(e){
                                                    console.log(e);
                                                }
                                            }).catch(error => {
                                                console.log(error.response.data["status"] + " " + error.response.data["message"]);
                                            });
                                        }
                                        break;
                                    }
                                    case ("fortune"):{
                                        if(typeof redemptionName === "string" && typeof profile["twitch"]["login"] === "string"){
                                            mongo_collection_fortunes.aggregate([{ $sample: { size: 1 } }]).forEach(async (fortune) => {      
                                                await sendPrivateMessage({
                                                    message: `PRIVMSG #${profile["twitch"]["login"].trim()} :@${redemptionName.trim()} ${fortune.text}`,
                                                    login: profile["twitch"]["login"].trim()
                                                });
                                            }).catch((e)=>{
                                                console.log(e);
                                            });                        
                                        }
                                        break;
                                    }
                                    case ("magicball"):{
                                        if(typeof redemptionName ==="string" && typeof profile["twitch"]["login"] === "string"){
                                            if(redemptionUserInput){
                                                let response = await axios.get(`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(redemptionUserInput)}`);
                                                try{
                                                    if(typeof response.data === "object"){
                                                        await sendPrivateMessage({
                                                            message: `PRIVMSG #${profile["twitch"]["login"].trim()} :@${redemptionName.trim()} ${response.data.magic.answer}`,
                                                            login: profile["twitch"]["login"].trim()
                                                        });
                                                    }
                                                }catch(e){
                                                    console.log(e);
                                                }       
                                            }
                                        }
                                        break;
                                    }
                                    case ("timeout"):{
                                        if(typeof redemptionName ==="string" && typeof profile["twitch"]["login"] === "string"){
                                            if(redemptionUserInput && typeof redemptionUserInput === "string"){
                                                //timeout person that is @ed
                                                redemptionUserInput = redemptionUserInput.replace("@", "");
                                                await sendPrivateMessage({
                                                    message: `PRIVMSG #${profile["twitch"]["login"].toLowerCase().trim()} :/timeout ${redemptionUserInput.toLowerCase().trim()} ${parseInt(reward["settings"]["features"]["length"])}`,
                                                    login: profile["twitch"]["login"].trim()               
                                                });

                                            }else{
                                                //timeout person that redeemed reward.
                                                await sendPrivateMessage({
                                                    message: `PRIVMSG #${profile["twitch"]["login"].toLowerCase().trim()} :/timeout ${redemptionName.toLowerCase().trim()} ${parseInt(reward["settings"]["features"]["length"])}`,
                                                    login: profile["twitch"]["login"].trim()
                                                });
                                            }
                                        }
                                        break;
                                    }
                                    case ("slowmode"):{

                                        break;
                                    }
                                    case ("submode"):{

                                        break;
                                    }
                                    case ("emotemode"):{

                                        break;
                                    }
                                    case ("runad"):{

                                        break;
                                    }
                                }
                             break;
                        }
                        console.log(reward["type"]);
                    }
                }
            }else{
                console.log(chalk.yellow("MongoDB error. User not found."));
            }
        }
    }catch(e){
        console.error(e)
    }
});

module.exports = router;

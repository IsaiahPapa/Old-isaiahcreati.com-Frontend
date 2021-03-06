/*Required*/
var MongoClient = require('mongodb').MongoClient;
var config = require("./_cfg.js")

/* Variables */
if(config.isLocalDev){
    var uri = config.MONGO_URI_TEST;
}else{
    var uri = config.MONGO_URI_LIVE;
}

let collection_;
let collection_rewards;
let db_resources;
let db_logs;
let db_;

let collection_resource_fortunes;
let collection_resource_voices; 

/*
*   MongoDB
*/

class module_settings {
    static tts({
            voice_name = "Brian",
            voice_code = "Brian",
            char_limit = 500,
            volume = 50,
            //Filters Object
            f_enabled = false,
            f_placeholder = "*",
            f_word_list = "thisisabannedword hereisanother",
            //Aws Object
            aws_access_key_id = "",
            aws_access_key_secret = "",
            aws_chars_used = 0,
            aws_isUsingAws = false
        } = {}) {
            var tts = {
                voice_name: voice_name,
                voice_code: voice_code,
                char_limit: char_limit,
                volume: volume,
                filter: {
                    enabled : f_enabled,
                    placeholder : f_placeholder,
                    word_list : f_word_list
                },
                aws: {
                    access_key_id : aws_access_key_id,
                    access_key_secret : aws_access_key_secret,
                    chars_used : aws_chars_used,
                    isUsingAws : aws_isUsingAws
                },
            };
            return tts;
    }
    static sound({
        type = "single", //single or multiple sounds
        upload_list = [
            {
                file_name: "nope.mp3",
                file_url: "www.isaiahcreati.com/assests/sounds/gwa.mp3",
                volume: 50
            }
        ],
        } = {}) {

        var sound = {
            type: type,
            upload_list: upload_list
        };

        return sound;
    }
    static video({
        type = "single", //single or multiple sounds
        upload_list =[
            {
                file_name: "nope.mp4",
                file_url: "www.isaiahcreati.com/assests/vid/shaq.mp4",
                volume: 50,
                display: {
                    x:"0",
                    y:"0",
                    scale: 50,
                    width: "100%",
                    height: "100%"
                }
            }
        ],
        } = {}) {

        var video = {
            type: type,
            upload_list: upload_list,
        };

        return video;
    }
    static runcommand(
        {
            command = "followage",
            features = {},
        } = {}) {
        var runcommand = {
            command: command,
            features: {},
        };
        switch(command){
            case "timeout": {
                if(features.hasOwnProperty('length')){
                    runcommand["features"]["length"] = features["length"];
                }
                break;
            }
            case "slowmode": {
                if(features.hasOwnProperty('duration') && features.hasOwnProperty('length')){
                    runcommand["features"]["duration"] = features["duration"];
                    runcommand["features"]["length"] = features["length"]
                }
                if(features.hasOwnProperty('length')){
                    runcommand["features"]["length"] = features["length"]
                }
                break;
            }
            case "submode": {
                if(features.hasOwnProperty('length')){
                    runcommand["features"]["length"] = features["length"]
                }
                break;
            }
            case "emotemode": {
                if(features.hasOwnProperty('length')){
                    runcommand["features"]["length"] = features["length"]
                }
                break;
            }
            case "runad": {
                if(features.hasOwnProperty('length')){
                    runcommand["features"]["length"] = features["length"]
                }
                break;
            }
        }
        return runcommand;
    }
    static showemote({
            size = "48px",
            showtime = "500",
            fadetime = "500"
        } = {}) {

        var showemote = {
            size: size,
            showtime: showtime,
            fadetime: fadetime
        };

        return showemote;
    }
}

/* Function to Export*/
module.exports = {

    getModuleSettings(){
        return module_settings;
    },

    connectToServer ( callback ){

        MongoClient.connect( uri,  { useNewUrlParser: true, useUnifiedTopology: true }, function( err, client ) {
            if(config.isLocalDev){
                //Main DB
                db_ = client.db("website_1_1");
                collection_  = db_.collection("users");
                collection_rewards = db_.collection("rewards");

                //Resources DB for 'fun' stuff. 
                db_resources = client.db("website-resources");
                //Resources collections
                collection_resource_fortunes =  db_resources.collection("fortune-cookies");
                collection_resource_voices =  db_resources.collection("aws-polly-voices");

                db_logs = client.db("website-logs");

            }else{
                //Resources DB for 'fun' stuff. 
                db_resources = client.db("website-resources");
                //Resources collections
                collection_resource_fortunes =  db_resources.collection("fortune-cookies");
                collection_resource_voices =  db_resources.collection("aws-polly-voices");

                //Main DB
                db_ = client.db("website");
                collection_  = db_.collection("users");
                collection_rewards = db_.collection("rewards");

                db_logs = client.db("website-logs");
            }
            return callback( err );
          } );

    },
    
    //MAIN DATABASE GETS
    getProfileCollection(){
        return collection_;
    },
    getRewardsCollection(){
        return collection_rewards;
    },

    //RESOURCES DATABASE GETS
    getFortunesCollection(){
        return collection_resource_fortunes;
    },
    getVoicesCollection(){
        return collection_resource_voices;
    },

    async getAllUserListening(){
        var userArray = [];
        await collection_.find().forEach( function(user) {
            if(user["isStreamer"] === true){
                userArray.push(
                    {
                        id: user["twitch"]["id"],
                        login: user["twitch"]["login"],
                        topic: `channel-points-channel-v1.${user["twitch"]["id"]}`,
                        access_token: user["twitch"]["access_token"],
                        refresh_token: user["twitch"]["refresh_token"],
                    }
                );
            }
        })
        return userArray;
    },

    async getVoices(){
        var voiceArray = [];

        await collection_resource_voices.find().forEach( function(voice) {
            voiceArray.push(voice);
        });

        return voiceArray;
    },
    async getProxyList(){
        var proxyArray = [];

        await db_.collection("proxies").find().forEach( function(proxy) {
            proxyArray.push(proxy);
        });

        return proxyArray;
    },
    async addRankToProfileById(id, rank){
        collection_.findOne({"twitch.id": id})
        .then(item => {
            if(item !== null){
                item["rank"] += rank;
                collection_.updateOne({"twitch.id": id}, {'$set': item}, (err, item) => {
                    if(err){
                        console.log(err);
                    }
                })
            }else{
                throw "user is not in database when adding, something went wrong here.";
            }
        })
        .catch(err => {
            console.error(err)
        });
    },
    async updateTokens(user){
        collection_.findOne({"twitch.id": user["id"]})
        .then(item => {
            if(item !== null){
                item["twitch"]["access_token"] = user["access_token"];
                item["twitch"]["refresh_token"] = user["refresh_token"];
                collection_.updateOne({"twitch.id": user["id"]}, {'$set': item}, (err, item) => {
                    if(err){
                        console.log(err);
                    }
                })
            }else{
                throw "user is not in database when updating token, something went wrong here.";
            }
        })
        .catch(err => {
            console.error(err)
        });
    },
    updateOrCreateUser ({twitch, uuid4}) { 
        
        var newUser = {
            rank: "user",
            isStreamer: false,
            botHasConnected: false,
            pubsubHasConnected: false,
            twitch
        };
        var newRewards = {
            _id: twitch.id,
            uuid4: uuid4,
            rewards: [
                {
                    reward_id: "",
                    type: "tts",
                    settings: module_settings.tts()
                }
            ]
        }

        //Search for user in USER collection 
        collection_.findOne({"twitch.id": twitch.id}).then(item => {
            if(item === null){

                //Create new ENTRY in USER collection 
                collection_.insertOne(newUser, (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(`[MongoDB] USER database entry for ${twitch.login} created`);
                });

                //Create new ENTRY in REWARDS collection 
                collection_rewards.insertOne(newRewards, (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(`[MongoDB] created REWARDS ENTRY for ${twitch.login}`);
                });

            }else{
                //User is already made, update ENTRY
                collection_.updateOne({"twitch.id": twitch.id}, {'$set': {twitch: twitch}}, (err, item) => {
                    if(err){
                        console.log(err);
                    }
                })
            }
        }).catch(err => {
            console.error(err)
        });


    },

    //POST
    async updateRewards({res, profile_id, rewards}){

        //Search for ENTRY in REWARDS collection
        if(collection_rewards){
            collection_rewards.findOne({_id: profile_id}).then(item => {
                if(item === null || typeof(item) === "undefined" || typeof(item) === "null"){
                    console.log(err);
                    res.sendStatus(404).send("Tried to Update Rewards but user not found.");
                    return;
                }else{
                    //User found, update item
                    collection_rewards.updateOne({_id: profile_id}, {'$set': {rewards: rewards}}, (err, item) => {
                        if(err){
                            console.log(err);
                            res.sendStatus(404).send("Tried to Update Rewards but failed.");
                        }else{
                            res.sendStatus(200);
                        }
                    })
                }
            }).catch(err => {
                console.error(err)
            });
        }else{
            console.log("no collection_rewards Defined : updateRewards")
        }
    },
    //POST
    async updateDashboardSettings(profileID, tts, lists, isStreamer, ids, res){
        //Then we can update the collection, first get the database to get a temp user. 
        if(collection_){
            await collection_.findOne({id: profileID}).then(item => {

                if(item === null || typeof(item) === "undefined" || typeof(item) === "null"){
                    console.log("Tried to updateDashboardSettings, but user not found.");
                    return;
                }
    
                item.modules["isStreamer"] = isStreamer;
                
                //Change TTS to updated stuff
                item.modules.tts["reward_id"] = ids[0];
                item.modules.tts["voice_name"] = tts["voice_name"];
                item.modules.tts["voice_code"] = tts["voice_code"];
                item.modules.tts["char_limit"] = tts["char_limit"];
                item.modules.tts["volume"] = tts["volume"];
                item.modules.tts.filter["enabled"] = tts["filter_enabled"];
                item.modules.tts.filter["placeholder"] = tts["filter_placeholder"];
                item.modules.tts.filter["word_list"] = tts["filter_list"];
                item.modules.tts.aws["access_key_id"] = tts.aws["access_key_id"];
                item.modules.tts.aws["access_key_secret"] = tts.aws["access_key_secret"];
    
                item.modules.sounds["reward_id"] = ids[1];
                item.modules.sounds.list["sounds"] = lists[0];
    
                item.modules.showemote["reward_id"] = ids[2];
    
                item.modules.playvideo["reward_id"] = ids[3];
                item.modules.playvideo["list"] = lists[1];
    
    
                collection_.updateOne({id: profileID}, {'$set': item}, (err, item) => {
                    if(err){
                        console.log("Tried to updateDashboardSettings, but failed to update.");
                        console.log(err);
                        res.sendStatus(404);
                    }else{
                        res.sendStatus(201);
                    }
        
                });
        
            })
            .catch(err => {
                console.error(err)
            });
        }else{
            console.log("no collection_ Defined : updateDashboardSettings")
        }
    },
    async updateBotStatusByLogin(login, status){
        //Then we can update the collection, first get the database to get a temp user. 
        if(collection_){
            await collection_.findOne({"twitch.login": login}).then(item => {

                if(item === null || typeof(item) === "undefined" || typeof(item) === "null"){
                    console.log("Tried to updateBotStatusByLogin, but user not found.");
                    return;
                }
                try{
                    if(status){
                        //10-4-20 357AM: Update Database Variables to they represent the actual data
                        if(status.type === "pubsub"){
                            item["pubsubHasConnected"] = JSON.parse(status.joined);
                        }else if(status.type === "chatbot"){
                            item["botHasConnected"] = JSON.parse(status.joined);
                        }

                        //10-4-20 357AM: Update isStreamer in case stuff resets. 
                        if(status.joined === true){
                            item["isStreamer"] = JSON.parse(status.joined);
                        }
                        
                        collection_.updateOne({"twitch.login": login}, {'$set': item}, (err, item) => {
                            if(err){
                                console.log(err);
                                //res.sendStatus(404);
                            }else{
                                
                                //res.sendStatus(201);
                            }
                
                        });
                    }
                }catch(e){
                    //res.sendStatus(404).send(e);
                }

        
            })
            .catch(err => {
                console.error(err)
            });
        }else{
            console.log("no collection_ Defined : updateBotStatusByLogin")
        }
    },
    async getRewardsByID(userId){
        var user = false;
        if(collection_rewards){
            await collection_rewards.findOne({"_id": userId })
            .then(item => {
                if(item === null || typeof(item) === "undefined"){
                    user = false;
                }else{
                    user = item;
                }
            })
            .catch(err => {
                user = false;
                console.error(err)
            });    
        }else{
            return false;
        }
        return user;
    },
    async getUserDataByID(userId){
        var user = false;
        if(collection_){
            await collection_.findOne({"twitch.id": userId })
            .then(item => {
                if(item === null || typeof(item) === "undefined"){
                    user = false;
                }else{
                    user = item;
                }
            })
            .catch(err => {
                user = false;
                console.error(err)
            });    
        }else{
            return false;
        }
        return user;
    },
    async getUserDataByLogin(login){
        var user;
        if(collection_){
            await collection_.findOne({"twitch.login": login})
            .then(item => {

                if(item === null || typeof(item) === "undefined"){
                    user = false;
                }else{
                    user = item;
                }
        
            })
            .catch(err => {
                user = false;
                console.error(err)
            });
        }else{
            return false;
        }
    
        return user;
    },
    async geRewardDataByUUID(uuid4){
        let rewards = false;
        if(collection_rewards){
            await collection_rewards.findOne({uuid4: uuid4}).then(item => {
                if(item === null){
                    return false;
                }else{
                    rewards = item;
                    return item;
                }
            }).catch(err => {
                rewards = false;
                console.error(err);
                return false;
            });
        }else{
            return false;
        }
        return rewards;
    },
    async getUserDataByUUID(uuid4){
        let user = false;
        if(collection_rewards){
            await collection_rewards.findOne({uuid4: uuid4}).then(item => {
                if(item === null){
                    return false;
                }else{
                    return item["_id"];
                }
            }).then((_id)=>{
                return collection_.findOne({"twitch.id": _id});
            }).then((item)=>{
                if(user === null){
                    return false;
                }else{
                    user = item;
                    return item;
                }
            }).catch(err => {
                user = false;
                console.error(err);
                return false;
            });
        }else{
            return false;
        }
        return user;
    },

    async logHandlerRedemption({document}){
        if(db_){
            await db_.collection("logs").insertOne(document, function (err, response){
                if(!err) {
                    return true;
                } else {
                    console.log(e);
                    throw e;
                }
            });
        }else{
            throw "No database to log to";
        }
    },
    async savePayPalCapture({document}){
        if(db_){
            await db_logs.collection("paypal-captures").insertOne(document, function (err, response){
                if(!err) {
                    return true;
                } else {
                    console.log(e);
                    throw e;
                }
            });
        }else{
            throw "No database to log to";
        }
    },
    //Resources
    //async getResoucesDatabase
    
}
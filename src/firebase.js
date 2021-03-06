let admin = require("firebase-admin");
let config = require("./_cfg");
let serviceAccount = require(config.FIREBASE_SERVICE);
const creati = require('./creati.js');


/* File Storage */
const {format} = require('util');
const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');
const storage = new Storage({
    projectId: "",
    credentials: serviceAccount
});
  
const bucket = storage.bucket("gs://.appspot.com/");
  
const multer = Multer({
    storage: Multer.memoryStorage()
});
/**
* Upload the image file to Google Storage
* @param {File} file object that will be uploaded to Google Storage
*/

const uploadFileToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file uploaded!");
            return;
        }
        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(`${file["user_id"]}/${file["originalname"]}`);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
            reject(err);
        });

        blobStream.on('finish', () => {
            
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            blob.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
                // signedUrls[0] contains the file's public URL
                resolve(signedUrls[0]);
            });
            //resolve(publicUrl);
            //resolve("Sucessfully uploaded file!");
        });

        blobStream.end(file.buffer);
    });
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://.firebaseio.com"
});


let db = exports.db = admin.database();

async function getCoinsTop(){
    var leaderboard = [];
    var ref = db.ref("users");
    
    //console.log(ref.val);
   
    /*
    var result = await ref.orderByChild("coins").on("child_added", async function(snapshot) {

        var username = snapshot.key;
        var coins = snapshot.val()["coins"];
        //console.log( username, coins);
        leaderboard.push({"username":username, "coins": coins});
        //console.log("Clip ID: ", clip.clipID, " Submitted by: ", clip.submittedBy, " upvotes: ", clip.upvotes, " downvotes: ", clip.downvotes, " date: ", clip.date);
        
    });
    */

    await ref.orderByChild("coins").once('value', snap => {
      snap.forEach(item => { leaderboard.push(item.val()) });
      leaderboard.reverse();
      //console.log(leaderboard);
    });
    
    return leaderboard;

    

}


function saveCoin(user, reward){

    var ref = db.ref("users");

    ref.once("value", function(snapshot) {

        if(snapshot.val()[user.login] === undefined){

            var coin = reward.cost;

            ref.child(user.login).set({
                coins: coin,
                username: user.login
            });
        }
        else {
            var coin = snapshot.val()[user.login]["coins"] + reward.cost;
            ref.child(user.login).set({
                coins: coin,
                username: user.login
            });
        }

        console.log("[Firebase] Saved " + user.display_name + " | " + reward.title + " | " + reward.cost);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}


async function getUserExists(){
    var exists;
    try{
        await db.ref("login").child("users").orderByChild("id").equalTo(profile[0]).once("value",snapshot => {
            if (snapshot.exists()){
                console.log("Already Made: True");
                exists = true;
                
            }else{
                console.log("Already Made: False");
                exists = false;
                
            }
        });
    }catch(e){
        console.log("[Firebase ERR]" + e);
    }

    return exists;


}

function getModules(userID){


    var ref = db.ref("login/users/" + userID);

    var id = [];

    ref.once("value", function(snapshot) {
        id = snapshot.val()["modules"];
    });

    return id;
 
}


function getWeeklySubVotes(){
    var week = creati.getWeekNumber(new Date());
    var votesArray = [];


    //https://api.igdb.com/pricing
    //https://www.igdb.com/api
    // There is a way to serach for games => https://api-docs.igdb.com/#about
    // MY idea is to search for the games that they vote and have 2 inputs Games based on search and THeir Real vote. 
    var ref = db.ref("votes/" + week[1] + "-" + week[0]);
    ref.on("child_added", function(snapshot) {
        user = snapshot.val();
        votesArray.push(user);
    });

    return votesArray; 

}

function getUserDataByID(user){
    var ref = db.ref("login/users/" + user);
    var userArray = [];

    ref.on("child_added", function(snapshot) {
        user = snapshot.val();
        userArray.push(user);
    });

    return userArray;
}

function getUsers(){
    var ref = db.ref("login/users");
    var userArray = [];

    ref.on("child_added", function(snapshot) {
        user = snapshot.val();
        userArray.push(user);
    });

    return userArray;
}

async function getSoundList(){

    var list = [];
    var ref = db.ref("sounds");

    await ref.orderByChild("count").once('value', snap => {
        snap.forEach(item => {
            list.push(item.val());
        });
        list.reverse();
    });
    
    return list;


}

async function updateSoundList(){

    var soundListHDD = creati.getSoundList();
    var soundListFirebase = [];

    var ref = db.ref("sounds");
    

    await ref.orderByChild("name").once('value', snap => {
        
        snap.forEach(item => { 

            soundListFirebase.push(item.val()["name"]);

        });
    });
    //Actually have no idea what this does, but I remember coding it on stream and it fixing something
    soundListHDD = soundListHDD.filter(function(val) {
        return soundListFirebase.indexOf(val) == -1;
    });

    if(soundListHDD.length !== 0){

        soundListHDD.forEach(element => {
            
            ref.push().set({
                name: element,
                count: 0,
            });

            console.log("[Firebase] New Sound found! Added", element, "to sound list.");
        });

    }

}

async function saveSoundCount(soundName){

    var ref = db.ref("sounds");

    ref.once("value", snap => {
        snap.forEach(item => { 
            if(item.val()["name"] === soundName){

                var countRef = db.ref("sounds/" + item.key + "/count");
                countRef.transaction(function (current_value) {
                  return (current_value || 0) + 1;
                });    

            }

        });
    });

    /*
    await ref.once("value", snap => {
        var upvotesRef = ref("server/saving-data/fireblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");
        upvotesRef.transaction(function (current_value) {
          return (current_value || 0) + 1;
        });

    });
    */
}



module.exports = {
    saveCoin,
    getUsers,
    getUserDataByID,
    getWeeklySubVotes,
    getCoinsTop,
    updateSoundList,
    getSoundList,
    saveSoundCount,
    getModules,
    uploadFileToStorage,
    multer
};
//const bannedWordList = require('./helpers/bannedwords.js');
const fs = require('fs');

function getSoundList(){

    var array  = fs.readdirSync('./public/assests/sounds');
    var soundList = [];

    for (var i = 0; i < array.length;i++){
        soundList.push(array[i].replace(".mp3", ""));
    }

    return soundList;
}

var path = require('path');

function getMainDir(){
    var mainDir = "";
    var arr_path = __dirname.split(path.sep);
    arr_path.splice(-1, 2);
    arr_path.forEach((element, index) => {
        if(index !== 0){
            mainDir += "/" + element;
        }else{
            mainDir += element;
        }
    });
    
    return mainDir;
}
/*
function isProfane(msg) {
    for (var i = 0; i < bannedWordList.bannedWords.length; i++) {
        if (msg.indexOf(bannedWordList.bannedWords[i]) > -1) { // returns '-1' if it is not present.
            return true;
        } else {
        }
    }
}
*/

//https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Sunday (past time, as we want it to reset sunday night/monday morning): current date - current day number
    // Make Sunday's day number 7
    //console.log(d.getUTCDate() - (d.getUTCDay()||7))
    d.setUTCDate(d.getUTCDate() - (d.getUTCDay()||7));
    
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}


module.exports = {
    getMainDir,
    getWeekNumber,
    getSoundList,
    //isProfane,
    setIsPlayingFalse: () => isPlaying = false,
    setIsPlayingTrue: () => isPlaying = true

};
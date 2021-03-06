/*logging*/
//Get time/date for file name
var d = new Date();
var d_now = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear() + "-" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
/*
const SimpleNodeLogger = require('simple-node-logger'), opts = {
    logFilePath: "./logs/" + d_now + ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
}, log = exports.log = SimpleNodeLogger.createSimpleFileLogger( opts );
*/
var fs = require('fs');

var actual_log = console.log;

console.log = function(msg) {
    let dir = "./logs/" + d_now + "/";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.appendFile(dir + "main.log", msg + "\n", function(err) {
        if(err) {
            return actual_log(err);
        }
    });
    actual_log(msg);
}
console.logonly = function(msg) {
    let dir = "./logs/" + d_now + "/";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.appendFile(dir + "main.log", msg + "\n", function(err) {
        if(err) {
            return actual_log(err);
        }
    });
}

console.logChat = function(msg, id) {
    let dir = "./logs/" + d_now + "/chat-logs/";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.appendFile(dir + "chat-" + id + ".log", msg + "\n", function(err) {
        if(err) {
            return actual_log(err);
        }
    });
}
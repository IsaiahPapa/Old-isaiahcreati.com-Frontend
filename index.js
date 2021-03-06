const config = require('./src/_cfg.js');
/*
*   Express & Socket
*/
const express         = require('express');
const session         = require('express-session');
const app             = express();
const http            = require('http').Server(app);

/*Logging*/
const logger = require('./src/logger.js');

/*Twitch Oauth*/
const twitch = require('./routes/twitch.js');
app.use('/', twitch)

/* EJS Engine*/
const engines = require('consolidate');
const cons = require('consolidate');
app.engine('html', engines.mustache);
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

//Set Parser and set public files dir
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Set Favicon
app.use('/favicon.ico', express.static('assests/img/favicon.ico'));

if(!config.downForService){
    
    /* Socket.io */
    var io = require('socket.io')(http);
    var ioNotifications =  exports.ioNotifications = io.of('/notifications');
    ioNotifications.on('connection', (socket) => {
        socket.on('join', (msg) => {
            socket.join(msg);
        });
    });


    /* 
    *   Website/Router Pathways
    */
    const index = require('./routes/index.js');
    app.use('/', index)

    const api = require('./routes/api.js');
    app.use('/api', api);

    const gateway = require('./routes/gateway.js');
    app.use('/gateway', gateway);
    

    app.get('*', function(req, res){

        res.locals.title = "404";
        
        var userData = false;
        if(req.session && req.session.passport && req.session.passport.user) {
            userData = req.session.passport.user;
        }
        res.render('404', {page_name: '404', userPassport: userData});
    });

}else{
    
    app.get("/alerts/v1/:alertKey", async function(req, res){

        var userData, alertKey, userData;

        if(req.session && req.session.passport && req.session.passport.user) {
            userData = req.session.passport.user;
        } else {
            userData = false;
        }

        if(typeof req.params.alertKey !== "undefined"){

            //The only data that should be sent is the alert key, username, and roomID
            alertKey = req.params.alertKey;

            //userFromDatabase = await mongo.getUserDataByUUID(alertKey);

            userData = {};
        }

        res.render("alerts", {alertKey: alertKey, userFromDatabase: userData, version: config.version});

    });
    app.get('*', function(req, res){
        res.locals.title = "Website Down for Maintenance";
        res.render('maintenance', {page_name: 'maintenance'});
    });
}

const port = 7000;
const ip = "127.0.0.1";
http.listen(port, ip, function(){
  console.log(`[Isaiahcreati.com] Version: ${config.version} listening on ${ip}:${port}`);
});

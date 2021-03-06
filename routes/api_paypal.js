const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const mongo = require('../src/mongo.js');

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const payPalClient = require('../src/paypal/client.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/capture-paypal-transaction', async function(req, res){
    
    let errors = [];
    let captures = {};
    let capture = {};
    let pending = false;
    // 2a. Get the order ID from the request body
    const orderID = req.body.orderID;

    // 3. Call PayPal to capture the order
    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    
    try {
        capture = await payPalClient.client().execute(request);
        captures = capture.result.purchase_units[0].payments.captures[0];

        switch(captures.status){
            case "COMPLETED": {
                if(req.session && req.session.passport && req.session.passport.user) {
                    let trans = capture.result.purchase_units[0].payments.captures[0];
                    if(trans.amount.value >= 5){
                        let user_id = req.session.passport.user["data"][0]["id"];
                        let user_login = req.session.passport.user["data"][0]["login"];
                        mongo.addRankToProfileById(user_id, " supporter").then(()=>{
                            console.log("[PayPal] Added 'Supporter' to '" + user_login + "'");
                        });
                    }
                }else{
                    errors.push("Transaction recieved but user data not defined. Contact Isaiah with your Twitch name.");
                }
                break;
            }
            case "PENDING":{
                pending = true;
                if(req.session && req.session.passport && req.session.passport.user) {
                    let trans = capture.result.purchase_units[0].payments.captures[0];
                    if(trans.amount.value >= 5){
                        let user_id = req.session.passport.user["data"][0]["id"];
                        let user_login = req.session.passport.user["data"][0]["login"];
                        mongo.addRankToProfileById(user_id, " supporter").then(()=>{
                            console.log("[PayPal] Added 'Supporter' to '" + user_login + "'");
                        });
                    }
                }else{
                    errors.push("Transaction recieved but user data not defined. Contact Isaiah with your Twitch name.");
                }
                break;
            }
            default: {
                console.log(capture)
                errors.push(`Transaction not completed. Got status: ${capture.result.purchase_units[0].payments.captures[0].status}`)
                break;
            }
        }
        
        // 4. Save the capture
        await mongo.savePayPalCapture({document: capture});

    }catch (err) {
        console.error(err);
        errors.push(err);
    }
    if(errors.length == 0){
        return res.status(200).send({
            success: true,
            pending: pending,
            capture: capture,
            errors: [],
        });
    }else{
        res.status(500).send({
            success: false,
            capture: capture,
            errors: errors
        });
    }
});

module.exports = router;

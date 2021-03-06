'use strict';

const config = require("../_cfg.js")

/**
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

/**
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 */
function environment() {
    //If I choose to use env variables. But they didn't work. 
    //let clientId = process.env.PAYPAL_CLIENT_ID || 'PAYPAL-SANDBOX-CLIENT-ID';
    //let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'PAYPAL-SANDBOX-CLIENT-SECRET';

    //Sandbox
    /*
    let clientId =  paypal_secrets.sb_clientId;
    let clientSecret = paypal_secrets.sb_clientSecret;
    return new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId, clientSecret
    );
    */

    //Live
    let clientId =  config.PAYPAL_CLIENT_ID_LIVE;
    let clientSecret = config.PAYPAL_CLIENT_SECRET_LIVE;
    
    return new checkoutNodeJssdk.core.LiveEnvironment(
        clientId, clientSecret
    );
}

async function prettyPrint(jsonData, pre=""){
    let pretty = "";
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (let key in jsonData){
        if (jsonData.hasOwnProperty(key)){
            if (isNaN(key))
              pretty += pre + capitalize(key) + ": ";
            else
              pretty += pre + (parseInt(key) + 1) + ": ";
            if (typeof jsonData[key] === "object"){
                pretty += "\n";
                pretty += await prettyPrint(jsonData[key], pre + "    ");
            }
            else {
                pretty += jsonData[key] + "\n";
            }

        }
    }
    return pretty;
}

module.exports = {client: client, prettyPrint:prettyPrint};
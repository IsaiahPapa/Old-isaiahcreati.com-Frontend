const AWS = require('aws-sdk')

module.exports= {
    async getSpeechBuffer({text, voice, access_key_id, access_key_secret}){
        if(access_key_id === "" || access_key_secret === ""){
            throw "Access key ID or Access Key Secret empty.";
        }
        const Polly = new AWS.Polly({
            accessKeyId: access_key_id,
            secretAccessKey: access_key_secret,
            signatureVersion: 'v4',
            region: 'us-east-1'
        });
    
        let params = {
            'Text': text,
            'OutputFormat': 'mp3',
            'VoiceId': voice
        }
        
        return Polly.synthesizeSpeech(params).promise().then( data => {
            if (data.AudioStream instanceof Buffer){
                return data.AudioStream;
            } else {
                throw "AudioStream is not a Buffer.";
            }
        }).catch(e =>{
            throw e;
        });
        
    }
      
}

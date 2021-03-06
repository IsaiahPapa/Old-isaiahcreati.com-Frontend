
module.exports = {

    findCharPosition: function (char, str, indexOfVariable) {
        //We are trying to find the closes semicolon position given the first index of the varialbe we are tyring to parse;
        for (var i = 0; i < str.length; i++) {
            if (str.substring(indexOfVariable + i, indexOfVariable + i + 1) === char) {
                return (indexOfVariable + i);
            }
        }
    },
    
    parseVariable: function (endingChar, msg, variable){
        //EndingChar is the last thing it wants to find
    
        var index_var = msg.search(variable + "=");
        if (msg.search(variable + "=") !== -1 && msg.search(variable + "=" + endingChar) === -1) {
            index_var = msg.search(variable + "=");
            variableValue = msg.substring((msg.search(variable + "=") + variable.length + 1), module.exports.findCharPosition(endingChar, msg, msg.search(variable + "=")));
            
            return variableValue;
        } else{
            return false;
        } 
    },

    asyncCheckType: async function(type, value){
        try{
            let errors = [];
            switch(type){
                case "string":{
                    if(typeof value !== "string"){
                        errors.push("String not typeof 'string'")
                    }
                    
                    break;
                }
                case "int":{
                    break;
                }
                case "object":{

                }
            }
            
        }catch(e){
            console.log(e);
        }
        
    }



}
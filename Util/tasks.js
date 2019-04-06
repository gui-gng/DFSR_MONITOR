const fileReader = require('../Util/FileReader');
const checkStatus = require('../Util/CheckStatus');
const sendMail = require('../Util/sendMail');


module.exports = {
    run: function (){
    
        fileReader.listFiles();
        fileReader.readAllfiles();
        
        var lastStatus = checkStatus.getLastStatus();

        let isFail = false;
        let body = "<h1> DFSR Monitor </h1> <br/>";

        for(var i = 0;i < lastStatus.length;i++){
            let status = lastStatus[i].Status.search("Failed");
            if(status > 0){
                body = body + lastStatus[i].fileName + " - " + lastStatus[i].Date + " - " + lastStatus[i].Status
                isFail = true;
            }
        }
        if(isFail){
            sendMail.send(body);
        }
        
    }
}


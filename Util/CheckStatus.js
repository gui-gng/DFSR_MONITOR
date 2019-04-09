const fs = require('fs');

<<<<<<< HEAD
//let fileName = "USERDATA-TSV-BNE";
module.exports = {
    getLastStatus: function(){
        let lastStatus = [];
        let rawdata = fs.readFileSync("Data/Data.json");
        let data = JSON.parse(rawdata);

        for(var i = 0; i < data.length;i++){
            let file = data[i];
            let lastFileContent = file.fileContent[file.fileContent.length-1];
            lastStatus.push({
                fileName:  file.fileName,
                Date:  lastFileContent.Date,
                Content: lastFileContent.Content,
                Status:  lastFileContent.Status
            });
        }
        return lastStatus;
    }
=======

module.exports = {

    
>>>>>>> origin/master
}
var express = require('express');
var router = express.Router();
const fs = require('fs');
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  let rawdata = fs.readFileSync('Data/Data.json');  
  let logs = JSON.parse(rawdata);  
  let values = [];

  for(let i = 0;i < logs.length;i++){
    let fileI = logs[i];
    
    let timeline_values = [];

    for(let x = 0;x < fileI.fileContent.length; x++){
        let dateStr = fileI.fileContent[x].Date;
        //dateStr format - Sat 19/05/2018 21:49:01.30
        let weekDay = dateStr.split(" ")[0];
        let date = dateStr;
        try
        {
            date = moment(dateStr.split(" ")[1] + " " + dateStr.split(" ")[2].split(".")[0], "DD/MM/YYYY kk:mm:ss");
        }
        catch(e)
        {
            console.log(e.message);
        }
        
        
        //"Status":"Operation Failed"

        timeline_values.push({
            weekDay: weekDay,
            date: date,
            status_flag: fileI.fileContent[x].Status == "Operation Succeeded"
        });
    }

    values.push({
        fileName: fileI.fileName,
        timeline: timeline_values
    });
  }
  res.render('timeline', { title: 'DFSR Monitor', values: values });
});

module.exports = router;

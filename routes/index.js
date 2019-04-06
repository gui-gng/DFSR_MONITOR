var express = require('express');
var router = express.Router();
const fs = require('fs');




/* GET home page. */
router.get('/', function(req, res, next) {
  let rawdata = fs.readFileSync('Data/Data.json');  
  let logs = JSON.parse(rawdata);  
 
  res.render('index', { title: 'DFSR Monitor', logs: logs });
});

module.exports = router;

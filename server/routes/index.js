var express = require('express');
var router = express.Router();
var morgan = require('morgan')
var formidable = require('formidable');
var fs = require('fs');
const utils = require('../scripts/utils');
var path = require('path');

var uploadFolder = utils.getUploadFolder();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index.js get')

  // If a file is requested
  // localhost:3000/?file=10001.tiff
  if (req.query.file) {
    res.sendFile(uploadFolder + req.query.file);
  }
  else {
    // If DELETE, call the 'delete' route
    if ( req.query._method == 'DELETE' ) {
      if (req.query.memberNum) {
        utils.deleteMember(req.query.memberNum);
      }
      else
        // change the original METHOD
        // into DELETE method
        utils.deleteAllFiles();
    }
    
    // get list of json files
    var files = fs.readdirSync(uploadFolder, { withFileTypes: true});

    // read each file
    var jsonArray = [];
    for (var i = 0; i < files.length; i++) {
      if (files[i].isFile() && files[i].name.endsWith("json")) {
        var rawdata = fs.readFileSync(uploadFolder + files[i].name);
        var json = JSON.parse(rawdata);
        jsonArray.push(json);
      }
    }
    res.render('index.html', { "title": "DocMgmt", "docData" : jsonArray });
  }
});

module.exports = router;

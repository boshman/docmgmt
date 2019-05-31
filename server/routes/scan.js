var express = require('express');
var router = express.Router();
var morgan = require('morgan')
var formidable = require('formidable');
var fs = require('fs');
const utils = require('../scripts/utils');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('scan.js get')

  res.render('scan.html', { "title": "DocMgmt" });
});

router.post('/', function(req, res, next) {
  console.log('scan.js post');

  var form = new formidable.IncomingForm();
  var msg = "";
  var oldpath = "";
  var newpath = "";
  var maxFileNum = 0;
  var uploadFolder = utils.getUploadFolder();
  
  form.parse(req, function (err, fields, files) {
    if (files.RemoteFile) {
      var firstName = fields["FIRST_NAME"];
      var lastName = fields["LAST_NAME"];
      var fileBaseName = utils.getNewFileNum(uploadFolder);
      oldpath = files.RemoteFile.path;
      newpath = uploadFolder + fileBaseName + ".tiff";
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });

      var newJson = { prop1 : "p1", prop2 : "p2" };
      var newJsonString = JSON.stringify(newJson);
      console.log("newJsonString = " + newJsonString);

      var json = { firstName : firstName, lastName : lastName, fileName : fileBaseName + ".tiff", memberNum : fileBaseName};
      var jsonString = JSON.stringify(json);
      fs.appendFile(uploadFolder + fileBaseName + '.json', jsonString, function(err) {
        if (err) throw err;
      });
      msg = "processed scanned image";
      res.end();
    }
  });
  
})

module.exports = router;

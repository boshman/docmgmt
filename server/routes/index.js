var express = require('express');
var router = express.Router();
var morgan = require('morgan')
var formidable = require('formidable');
var fs = require('fs');
const utils = require('../scripts/utils');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index.js get')
  res.render('index', { title: 'DocMgmt' });
});

router.post('/', function(req, res, next) {
  console.log('index.js post');

  var form = new formidable.IncomingForm();
  var msg = "";
  var oldpath = "";
  var newpath = "";
  var maxFileNum = 0;

  const uploadFolder = 'C:/Temp/uploads/';
  
  form.parse(req, function (err, fields, files) {
    if (files.RemoteFile) {
      oldpath = files.RemoteFile.path;
      newpath = 'C:/Temp/uploads/' + utils.getNewFileNum(uploadFolder) + '.tiff';
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
      msg = "processed scanned image";
      res.end();
    }
  });
  
})

module.exports = router;

var express = require("express");
var router = express.Router();
var morgan = require("morgan");
var formidable = require("formidable");
var fs = require("fs");
const utils = require("../scripts/utils");
const db = require("../scripts/db");
var path = require("path");
var mysql = require("mysql");

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("scan.js get");

  res.render("scan.html", { title: "DocMgmt" });
});

router.post("/", function(req, res, next) {
  console.log("scan.js post");

  var form = new formidable.IncomingForm();
  var msg = "";
  var oldpath = "";
  var newpath = "";
  var maxFileNum = 0;
  var uploadFolder = utils.getUploadFolder();

  form.parse(req, function(err, fields, files) {
    if (files.RemoteFile) {
      var firstName = fields["FIRST_NAME"];
      var lastName = fields["LAST_NAME"];

      db.addDoc(firstName, lastName).then(docNum => {
        var fileBaseName = docNum;
        console.log("fileBaseName: " + fileBaseName);

        utils.putFile(files, fileBaseName);
      });

      msg = "processed scanned image";
      res.end();
    }
  });
});

module.exports = router;

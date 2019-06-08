var express = require("express");
var router = express.Router();
var morgan = require("morgan");
var formidable = require("formidable");
var fs = require("fs");
const utils = require("../scripts/utils");
var path = require("path");
var db = require("../scripts/db");

var uploadFolder = utils.getUploadFolder();

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("index.js get");

  // If a file is requested, send it to the client
  // localhost:3000/?file=10001.tiff
  if (req.query.file) {
    // Get from hadoop
    res.sendFile(uploadFolder + req.query.file);
  } else {
    // If DELETE, call the 'delete' route.
    if (req.query._method == "DELETE") {
      if (req.query.memberNum) {
        // localhost:3000/?_method=DELETE&memberNum=10001
        utils.deleteMember(req.query.memberNum);
      } else {
        // If no member number, then delete ALL files
        // localhost:3000/?_method=DELETE
        utils.deleteAllFiles();
      }
    }

    db.getAllDocs().then(docs => {
      res.render("index.html", { title: "DocMgmt", docData: docs });
    });
  }
});

module.exports = router;

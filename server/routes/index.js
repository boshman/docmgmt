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
    utils.getFile(req.query.file, (err, data) => {
      if (err) throw err;
      fs.writeFile(utils.getTempFolder() + req.query.file, data, err => {
        if (err) throw err;
        res.sendFile(utils.getTempFolder() + req.query.file);
      });
    });
  } else {
    // If DELETE, call the 'delete' route.
    if (req.query._method == "DELETE") {
      // localhost:3000/?_method=DELETE&memberNum=10001
      utils.deleteFile(req.query.memberNum);
      db.deleteDoc(req.query.memberNum);
    }

    db.getAllDocs().then(docs => {
      res.render("index.html", { title: "DocMgmt", docData: docs });
    });
  }
});

module.exports = router;

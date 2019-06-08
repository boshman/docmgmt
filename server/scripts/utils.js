var fs = require("fs");
const path = require("path");
var WebHDFS = require("webhdfs");

const uploadFolder = "C:/Temp/uploads/";
const tempFolder = "C:/Temp/tempuploads/";
const uploadFolderHDFS = "/myhdfsfol1/";

var filenum = 10000;

var hdfs = WebHDFS.createClient({
  user: "hduser",
  host: "ben-Virtual-Machine",
  port: 9870,
  path: "/webhdfs/v1"
});

class Utils {
  getNewFileNum() {
    filenum++;
    return filenum;
  }

  deleteAllFiles() {
    // Find each file in the scan folder and delete
    var files = fs.readdirSync(uploadFolder, { withFileTypes: true });

    for (var i = 0; i < files.length; i++) {
      fs.unlinkSync(uploadFolder + files[i].name);
    }
  }

  getFile(fileName) {
    var file = fs.readFileSync(uploadFolder + fileName);
  }

  getUploadFolder() {
    return uploadFolder;
  }

  deleteMember(memberNum) {
    fs.unlinkSync(uploadFolder + memberNum + ".tiff");
    fs.unlinkSync(uploadFolder + memberNum + ".json");
  }

  putFile(dynamsoftFiles, fileBaseName) {
    if (dynamsoftFiles.RemoteFile) {
      // Save the uploaded image to temp folder
      var oldpath = dynamsoftFiles.RemoteFile.path;
      var newpath = uploadFolder + fileBaseName + ".tiff";
      fs.rename(oldpath, newpath, function(err) {
        if (err) throw err;

        // Stream the file from temp folder to HDFS
        var localFileStream = fs.createReadStream(newpath);
        var remoteFileStream = hdfs.createWriteStream(
          uploadFolderHDFS + fileBaseName + ".tiff"
        );
        localFileStream.pipe(remoteFileStream);

        remoteFileStream.on("error", function(err) {
          if (err) throw err;
        });

        return fileBaseName;
      });
    }
  }
}

module.exports = new Utils();

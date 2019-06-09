var fs = require("fs");
const path = require("path");
var WebHDFS = require("webhdfs");

const useHadoop = true;

const uploadFolder = "C:/Temp/uploads/";
const tempFolder = "C:/Temp/tempuploads/";
const uploadFolderHDFS = "/myhdfsfol1/";

var hdfs = WebHDFS.createClient({
  user: "hduser",
  host: "ben-Virtual-Machine",
  port: 9870,
  path: "/webhdfs/v1"
});

class Utils {
  getFile(fileName, callback) {
    if (useHadoop) {
      hdfs.readFile(uploadFolderHDFS + fileName, callback);
    } else {
      fs.readFile(uploadFolder + fileName, callback);
    }
  }

  getUploadFolder() {
    return uploadFolder;
  }

  getTempFolder() {
    return tempFolder;
  }

  deleteFile(memberNum) {
    if (useHadoop) {
      hdfs.unlink(uploadFolderHDFS + memberNum + ".tiff");
    } else {
      fs.unlinkSync(uploadFolder + memberNum + ".tiff");
    }
  }

  putFile(dynamsoftFiles, fileBaseName) {
    if (dynamsoftFiles.RemoteFile) {
      // Save the uploaded image to temp folder
      var oldpath = dynamsoftFiles.RemoteFile.path;
      var newpath = tempFolder + fileBaseName + ".tiff";
      fs.rename(oldpath, newpath, err => {
        if (err) throw err;

        if (useHadoop) {
          // Stream the file from temp folder to HDFS
          var localFileStream = fs.createReadStream(newpath);
          var remoteFileStream = hdfs.createWriteStream(
            uploadFolderHDFS + fileBaseName + ".tiff"
          );
          localFileStream.pipe(remoteFileStream);

          remoteFileStream.on("error", err => {
            if (err) throw err;
          });
        } else {
          fs.rename(newpath, uploadFolder + fileBaseName + ".tiff", err => {
            if (err) throw err;
          });
        }

        fs.unlinkSync(newpath);
      });
    }
  }
}

module.exports = new Utils();

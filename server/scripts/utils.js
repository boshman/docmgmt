var fs = require('fs');
const path = require('path');

const uploadFolder = 'C:/Temp/uploads/';
var filenum = 10000;

class Utils {

    getNewFileNum(dir) {
        filenum++;
        return filenum;
    }

    deleteAllFiles() {
        // Find each file in the scan folder and delete
        var files = fs.readdirSync(uploadFolder, { withFileTypes: true});
      
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

    deleteMember(memberNum){ 
        fs.unlinkSync(uploadFolder + memberNum + '.tiff');
        fs.unlinkSync(uploadFolder + memberNum + '.json');
    }
}

module.exports = new Utils();
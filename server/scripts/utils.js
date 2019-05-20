var fs = require('fs');
const path = require('path');

class Utils {
    getNewFileNum(dir) {
        var maxFileNum = 10000;
        var currFileNum = 0;

        var files = fs.readdirSync(dir, { withFileTypes: true});

        for (var i = 0; i < files.length; i++) {
            if (files[i].isFile) {
                // Get the name without extension
                var pathObj = path.parse(path.join(dir, files[i].name)); // returns "testfile" from testfile.txt

                // Skip if filename is non numeric
                if (!isNaN(pathObj.name)){
                    currFileNum = pathObj.name;
                    maxFileNum = (currFileNum > maxFileNum) ? currFileNum : maxFileNum;
                }
            }
        }

        return Number(maxFileNum) + 1;
    }
}

module.exports = new Utils();
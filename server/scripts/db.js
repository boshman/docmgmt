const mysql = require("mysql");
const util = require("util");

const conn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "docmgmt"
});

const query = util.promisify(conn.query).bind(conn);

class DB {
  async addDoc(firstName, lastName) {
    try {
      var values = [[firstName, lastName]];
      const result = await query(
        "INSERT INTO doc (FIRST_NAME, LAST_NAME) VALUES ?",
        [values]
      );
      var documentNumber = result.insertId;

      await query("UPDATE doc SET FILENAME = ? WHERE DOCUMENT_NUMBER = ?", [
        documentNumber + ".tiff",
        documentNumber
      ]);

      return documentNumber;
    } finally {
      //conn.end();
    }
  }

  async getAllDocs() {
    try {
      const rows = await query(
        "SELECT DOCUMENT_NUMBER AS documentNumber, FIRST_NAME AS firstName, LAST_NAME AS lastName, FILENAME AS fileName FROM  doc"
      );
      return rows;
    } finally {
      //await conn.end();
    }
  }
}

module.exports = new DB();

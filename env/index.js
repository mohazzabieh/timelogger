const path = require("path");

module.exports = {
  port: 4400,
  dbPath: path.join(__dirname, "../database.sqlite3"),
};

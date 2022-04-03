const sqlite3 = require("sqlite3");

module.exports = {
  init: () => {
    return new Promise((resolve, reject) => {
      //get databse path from env and connect/create database file
      let db = new sqlite3.Database(env.dbPath, (err) => {
        if (err) {
          console.error(`Error in SQLite connection: ${err}`);

          return reject(err);
        } else {
          //check for table existence (& create if necessary)
          const CREATE_DB_COMMAND =
            "CREATE TABLE IF NOT EXISTS logs(id INTEGER PRIMARY KEY AUTOINCREMENT, start TEXT, end TEXT, description TEXT)";

          db.run(CREATE_DB_COMMAND, (tblCreationError) => {
            if (tblCreationError) {
              console.error(
                `Error in SQLite table creation: ${tblCreationError}`
              );

              return reject(tblCreationError);
            }

            resolve(db);
          });
        }
      });
    });
  },

  insert: async (database, { start, end, description }) => {
    const INSERT_COMMAND = `INSERT INTO logs (start, end, description)
    values ('${start}', '${end}', '${description || ""}')`;

    return new Promise((resolve, reject) => {
      database.run(INSERT_COMMAND, function (err) {
        if (err) {
          console.error(`Error in SQLite insertion: ${err}`);

          return reject(err);
        }

        let insertedItem;

        database.serialize(() => {
          database.each(
            `SELECT * FROM logs WHERE id=${this.lastID}`,
            (err, row) => {
              insertedItem = row;
            },
            (err) => {
              resolve(insertedItem);
            }
          );
        });
      });
    });
  },

  select: async (database) => {
    const SELECT_COMMAND = "SELECT * FROM logs ORDER BY start DESC";
    return new Promise((resolve, reject) => {
      database.serialize(() => {
        let result = [];
        database.each(
          SELECT_COMMAND,
          (err, row) => {
            if (err) {
              return reject(err);
            }
            result.push({ ...row });
          },
          (err) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      });
    });
  },
};

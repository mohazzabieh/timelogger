const moment = require("moment");
const { insert, select } = require("../hooks/database");

const errorHandler = (err, res) => {
  res.status(500).send((err && err.message) || "Server error");
};

const validateDate = (date) => moment(date, moment.ISO_8601, true).isValid();

module.exports = {
  // Insert log entry to database
  setLog: async ({ body: { start, end, description }, res }) => {
    try {
      if (!start || !end) {
        throw Error("Invalid params");
      }

      if (typeof start !== "string" || typeof end !== "string") {
        throw Error("Invalid data type");
      }

      if (!validateDate(start) || !validateDate(end)) {
        throw Error("Invalid date format");
      }

      const result = await insert(db, { start, end, description });

      res.send(result);
    } catch (ex) {
      errorHandler(ex, res);
    }
  },
  // Read logs entry from database
  getLogs: async ({ req, res }) => {
    const result = await select(db);

    res.send(result);
  },
};

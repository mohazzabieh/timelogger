const assert = require("assert");
const fs = require("fs");
const path = require("path");

const databaseHook = require("../hooks/database");

describe("Database", function () {
  describe("Manipulating data", function () {
    const dbPath = path.join(__dirname, "test.database.sqlite3");
    let testDB = undefined;

    before(async () => {
      global.env = {
        dbPath,
      };

      testDB = await databaseHook.init();
    });

    after(() => {
      fs.unlink(dbPath, () => {});
    });

    it("should insert item in database", async function () {
      const newItem = {
        start: new Date().toISOString(),
        end: new Date().toISOString(),
      };

      let result = await databaseHook.insert(testDB, newItem);

      assert.notEqual(result, null);
      assert.equal(Object.keys(result).length, 4);
    });

    it("should get items from database", async function () {
      await databaseHook.insert(testDB, {
        start: new Date().toISOString(),
        end: new Date().toISOString(),
      });

      const result = await databaseHook.select(testDB);

      assert.notEqual(result, null);
      assert.equal(Array.isArray(result), true);
      assert.equal(result.length, 2);
      assert.equal(result[0].start > result[1].start, true);
    });
  });
});

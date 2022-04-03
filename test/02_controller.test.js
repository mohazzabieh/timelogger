const assert = require("assert");
const fs = require("fs");
const path = require("path");

const databaseHook = require("../hooks/database");
const controller = require("../controller");

describe("Controller", function () {
  describe("Validate params", function () {
    const dbPath = path.join(__dirname, "test.database.sqlite3");
    let testDB = undefined;

    class Response {
      code = 0;
      data;

      status(code) {
        this.code = code;
        return this;
      }

      send(data) {
        this.data = data;
        return data;
      }
    }

    before(async () => {
      global.env = {
        dbPath,
      };

      testDB = await databaseHook.init();
    });

    after(() => {
      fs.unlink(dbPath, () => {});
    });

    it("should validate params", async function () {
      var res = new Response();

      await controller.setLog({
        body: {
          start: new Date().toISOString(),
        },
        res,
      });

      assert.equal(res.code, 500);
      assert.equal(res.data, "Invalid params");
    });

    it("should validate data type", async function () {
      var res = new Response();

      await controller.setLog({
        body: {
          start: new Date().toISOString(),
          end: 11,
        },
        res,
      });

      assert.equal(res.code, 500);
      assert.equal(res.data, "Invalid data type");
    });

    it("should validate formats", async function () {
      var res = new Response();

      await controller.setLog({
        body: {
          start: new Date().toISOString(),
          end: "132",
        },
        res,
      });

      assert.equal(res.code, 500);
      assert.equal(res.data, "Invalid date format");
    });
  });
});

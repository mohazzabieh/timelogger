const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const databaseHook = require("./hooks/database");

//load env variables into global
global.env = require("./env");

const start = async () => {
  try {
    //call databse hook to init sqlite3 database and make it global
    global.db = await databaseHook.init();

    const webpack = require("webpack");
    const webpackMiddleware = require("webpack-dev-middleware");

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const server = http.createServer(app);

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));

    const webpackConfig = require("./webpack.config");
    const compiler = webpack(webpackConfig, () => {});

    app.use(
      webpackMiddleware(compiler, {
        publicPath: "/",
        writeToDisk: true,
      })
    );

    const api = require("./routes/api");
    app.use("/api", api);

    const index = require("./routes/index");
    app.use("/", index);

    app.get("*", (req, res) => {
      res.send(404);
    });

    server.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`);
    });

    process.on("SIGTERM", () => {
      // on shutdown, close databse
      if (db) {
        db.close();
        console.log("Database closed successfully");
      }

      server.close(() => {
        console.log("HTTP server closed");
      });
    });
  } catch (ex) {
    console.error(`Error in starting server: ${ex}`);
  }
};

start();

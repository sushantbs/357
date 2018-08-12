import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as errorHandler from "errorhandler";
import * as sessions from "client-sessions";
import * as http from "http";
import * as path from "path";

import socketify from "./socket";
import { apiRouteHandler, SessionRequest } from "./routes";
import gameManager from "./src/GameManager";
// const debug = require("debug")("typescript-node:server");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/** Live code: The client-sessions middleware */
app.use(
  sessions({
    secret: "BadSecret",
    cookieName: "mySession"
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(__dirname));

app.use("/api", apiRouteHandler);

app.get("/", (req: SessionRequest, res: express.Response) => {
  let { name, gameId, wins, losses, streak, longestStreak } = req.mySession;
  let gameCount = gameManager.getGameCount();
  res.render("index", {
    name,
    gameId,
    gameCount,
    wins,
    losses,
    streak,
    longestStreak
  });
});

app.get("/leader", (req: SessionRequest, res: express.Response) => {
  let gameCount = gameManager.getGameCount();
  let gameStats = gameManager.getGameStats();

  res.render("leader", {
    gameCount,
    wins: gameStats.totalWins.count,
    names: gameStats.totalWins.players.map(({ name }) => name).join(`, `)
  });
});

app.use(errorHandler());

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

socketify(server);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

export default app;

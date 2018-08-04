import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as errorHandler from "errorhandler";
import * as sessions from "client-sessions";
import * as http from "http";
import * as path from "path";

import gameManager from "./src/GameManager";
import guid from "./src/guid";
import socketify from "./socket";

const debug = require("debug")("typescript-node:server");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  sessions({
    secret: "BadSecret",
    cookieName: "mySession"
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(__dirname));

interface SessionRequest extends express.Request {
  mySession: any;
}

app.post(
  "/register",
  (req: SessionRequest, res: express.Response, next: express.NextFunction) => {
    let { playerName } = req.body;
    let playerId = guid();
    req.mySession.playerName = playerName;
    req.mySession.playerId = playerId;
    req.mySession.wins = 0;
    req.mySession.losses = 0;
    req.mySession.streak = 0;

    gameManager.registerPlayer({ name: playerName, id: playerId });
    res.send({
      success: true,
      payload: { playerName }
    });
  }
);

app.post(
  "/validate",
  (req: SessionRequest, res: express.Response, next: express.NextFunction) => {
    let { playerName, playerId } = req.mySession;

    // in a real app this endpoint can be used to pass a token
    // that can be cross verified when the socket connection is being made.
    // For now, in the browser, we trust.
    res.send({ allowConnection: Boolean(playerName) });
  }
);

app.post("/play", (req: SessionRequest, res: express.Response) => {
  let { playerName, playerId } = req.mySession;
  let gameId = gameManager.addToWaitingLounge({
    name: playerName,
    id: playerId
  });
  req.mySession.gameId = gameId;
  res.send({ success: true, gameId });
});

app.post("/complete", (req: SessionRequest, res: express.Response) => {
  let { playerId, gameId } = req.mySession;
  let winner = gameManager.getGameWinner(gameId);
  if (winner) {
    if (winner.id === playerId) {
      req.mySession.wins += 1;
      req.mySession.streak += 1;
    } else {
      req.mySession.losses += 1;
      req.mySession.streal = 0;
    }
    gameManager.leaveGame(gameId, playerId);
    delete req.mySession.gameId;
    res.send({ success: true });
  } else {
    res.send({ success: true });
  }
});

app.post("/sanitize", (req: SessionRequest, res: express.Response) => {
  let { playerId, gameId } = req.mySession;
  gameManager.registerPlayer(playerId);
  if (!gameManager.hasGame(gameId)) {
    delete req.mySession.gameId;
  }
  res.send({ success: true });
});

app.post("/leave", (req: SessionRequest, res: express.Response) => {
  let { playerId, playerName } = req.mySession;

  gameManager.removePlayer({ id: playerId, name: playerName });
  req.mySession.destroy();
  res.send({ success: true });
});

app.post("/forfeit", (req: SessionRequest, res: express.Response) => {
  let { gameId, playerId, playerName } = req.mySession;
  req.mySession.losses += 1;
  req.mySession.streal = 0;

  gameManager.forfeitGame(gameId, { id: playerId, name: playerName });
  res.send({ success: true });
});

app.get(
  "/",
  (req: SessionRequest, res: express.Response, next: express.NextFunction) => {
    let { playerName, gameId, wins, losses, streak } = req.mySession;
    let gameCount = gameManager.getGameCount();
    res.render("index", {
      playerName,
      gameId,
      gameCount,
      wins,
      losses,
      streak
    });
  }
);

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

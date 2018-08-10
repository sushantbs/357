// @ts-check
import { RequestHandler, Request, Response, Router } from "express";

import guid from "../src/guid";
import gameManager from "../src/GameManager";

interface SessionObject {
  name: string;
  id: string;
  wins: number;
  losses: number;
  streak: number;
  longestStreak: number;
  gameId: string;
  destroy(): void;
}

interface SessionRequest extends Request {
  mySession: SessionObject;
}

export const apiRouteHandler = Router();

export const renderRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
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
};

export const registerRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { name } = req.body;
  let id = guid();

  req.mySession.name = name;
  req.mySession.id = id;
  req.mySession.wins = 0;
  req.mySession.losses = 0;
  req.mySession.streak = 0;
  req.mySession.longestStreak = 0;

  gameManager.registerPlayer({ name, id });
  res.send({
    success: true,
    payload: { name }
  });
};

/** Live code */
export const playRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { name, id } = req.mySession;
  let gameId = gameManager.addToWaitingLounge({
    name: name,
    id: id
  });
  req.mySession.gameId = gameId;
  res.send({ success: true, gameId });
};

export const validateRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { name } = req.mySession;

  // in a real app this endpoint can be used to pass a token
  // that can be cross verified when the socket connection is being made.
  // For now, in the browser, we trust.
  res.send({ allowConnection: Boolean(name) });
};

export const completeRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { id, gameId } = req.mySession;
  let winner = gameManager.getGameWinner(gameId);
  if (winner) {
    if (winner.id === id) {
      req.mySession.wins += 1;
      req.mySession.streak += 1;
      if (req.mySession.longestStreak < req.mySession.streak) {
        req.mySession.longestStreak = req.mySession.streak;
      }
    } else {
      req.mySession.losses += 1;
      req.mySession.streak = 0;
    }

    gameManager.leaveGame(gameId, id);
    delete req.mySession.gameId;

    res.send({ success: true });
  } else {
    res.send({ success: true });
  }
};

export const sanitizeRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { id, name, gameId } = req.mySession;
  gameManager.registerPlayer({ id, name });
  if (!gameManager.hasGame(gameId)) {
    delete req.mySession.gameId;
  }
  res.send({ success: true });
};

export const leaveRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { id, name } = req.mySession;

  gameManager.removePlayer({ id, name });
  req.mySession.destroy();
  res.send({ success: true });
};

export const forfeitRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { gameId, id, name } = req.mySession;

  gameManager.forfeitGame(gameId, { id, name });
  res.send({ success: true });
};

export const cancelRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { gameId, id } = req.mySession;
  gameManager.leaveGame(gameId, id);
  delete req.mySession.gameId;
  res.send({ success: true });
};

/** Live code */
apiRouteHandler.post("/register", registerRoute);

apiRouteHandler.post("/validate", validateRoute);

/** Live code */
apiRouteHandler.post("/play", playRoute);

apiRouteHandler.post("/complete", completeRoute);

apiRouteHandler.post("/sanitize", sanitizeRoute);

apiRouteHandler.post("/leave", leaveRoute);

apiRouteHandler.post("/cancel", cancelRoute);

apiRouteHandler.post("/forfeit", forfeitRoute);

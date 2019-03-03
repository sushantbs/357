// @ts-check
import { RequestHandler, Response, Router, Request } from "express";
// import { SessionRequest } from "app-types";

import guid from "../src/guid";
import gameManager from "../src/GameManager";
import { SessionRequest } from "../typings";
export const apiRouteHandler = Router();

export const userStatus: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { mySession } = req;

  if (mySession && mySession.id) {
    let { handle, id, avatar, accessKey } = mySession;

    if (accessKey) {
      let game = gameManager.getGameByAccessKey(accessKey);
      if (!game) {
        // access key is not valid.
        // possibly due to a server restart in dev.
        // in prod this would be an incident
        mySession.accessKey = null;
        res.send({
          status: "player",
          handle,
          id,
          avatar
        });

        return;
      }

      // if the game has a winner means the game has ended already
      let hasWinner = game.getWinner();

      if (hasWinner) {
        mySession.accessKey = null;
        res.send({
          status: "player",
          handle,
          id,
          avatar
        });
      } else {
        res.send({
          status: "player",
          handle,
          id,
          avatar,
          accessKey
        });
      }
    } else {
      res.send({
        status: "player",
        handle,
        id,
        avatar
      });
    }
  } else {
    res.send({ status: "guest" });
  }
};
apiRouteHandler.get("/status", userStatus);

export const createRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { type } = req.body;
  let { avatar, handle, id } = req.mySession;
  id = id || guid();

  const gameId = gameManager.setupGame(type, [
    { id, avatar, handle, rtcReady: false }
  ]);
  let accessKey = gameManager.getAccessKey(gameId);

  Object.assign(req.mySession, {
    id,
    isCreator: true,
    accessKey: accessKey
  });

  res.send({ success: true, accessKey });
};
apiRouteHandler.post("/create", createRoute);

export const joinRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { accessKey } = req.body;

  let { id, avatar, handle } = req.mySession;
  id = id || guid();

  let game = gameManager.getGameByAccessKey(accessKey);
  if (game) {
    // if the game has a winner means the game has ended already
    let hasWinner = game.getWinner();

    if (hasWinner) {
      Object.assign(req.mySession, {
        id,
        accessKey: null
      });

      res.send({
        status: "error",
        message: "Game has ended"
      });
    } else {
      let playerAdded: boolean = game.addPlayer({
        id,
        avatar,
        handle,
        rtcReady: false
      });
      if (playerAdded) {
        Object.assign(req.mySession, {
          id,
          accessKey,
          isCreator: false
        });

        res.send({
          status: "player",
          id,
          handle,
          avatar,
          accessKey
        });
      } else {
        // player already added to the game
        // but gameId doesn't exist on the session object. What do we do?
      }
    }
  }
};
apiRouteHandler.post("/join", joinRoute);

export const updateProfileRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { avatar, handle, bio } = req.body;
  let { id } = req.mySession;
  Object.assign(req.mySession, {
    avatar,
    handle,
    bio
  });

  res.send({
    status: "player",
    id,
    avatar,
    handle,
    bio
  });
};
apiRouteHandler.put("/profile", updateProfileRoute);

export const leaveRoute: RequestHandler = (
  req: SessionRequest,
  res: Response
) => {
  let { id, accessKey } = req.mySession;

  gameManager.removePlayer(id, accessKey);

  delete req.mySession.accessKey;
  res.send({ success: true, status: "player" });
};
apiRouteHandler.post("/leave", leaveRoute);

// /** Live code */
// export const playRoute: RequestHandler = (
//   req: SessionRequest,
//   res: Response
// ) => {
//   let { name, id, gameId } = req.mySession;
//   if (gameId) {
//     if (!gameManager.hasGame(gameId)) {
//       delete req.mySession.gameId;
//     }
//   } else {
//     gameId = gameManager.addToWaitingLounge({
//       name: name,
//       id: id
//     });
//     req.mySession.gameId = gameId;
//     res.send({ success: true, gameId });
//   }
// };
// apiRouteHandler.post("/play", playRoute);

// export const validateRoute: RequestHandler = (
//   req: SessionRequest,
//   res: Response
// ) => {
//   let { name } = req.mySession;

//   // in a real app this endpoint can be used to pass a token
//   // that can be cross verified when the socket connection is being made.
//   // For now, in the browser, we trust.
//   res.send({ allowConnection: Boolean(name) });
// };

// export const completeRoute: RequestHandler = (
//   req: SessionRequest,
//   res: Response
// ) => {
//   let { name, id, gameId } = req.mySession;
//   let winner = gameManager.getGameWinner(gameId);

//   console.log(`${name}: ${id} is checking for completion`);
//   if (winner) {
//     if (winner.id === id) {
//       console.log(`${name}: ${id} has completed the game as the winner`);
//       req.mySession.wins += 1;
//       req.mySession.streak += 1;
//       if (req.mySession.longestStreak < req.mySession.streak) {
//         req.mySession.longestStreak = req.mySession.streak;
//       }
//       gameManager.extractStatsFromSession(req.mySession);
//     } else {
//       console.log(`${name}: ${id} has completed the game as the loser`);
//       req.mySession.losses += 1;
//       req.mySession.streak = 0;
//     }

//     gameManager.leaveGame(gameId, id);
//     delete req.mySession.gameId;

//     res.send({ success: true });
//   } else {
//     res.send({ success: true });
//   }
// };
// apiRouteHandler.post("/complete", completeRoute);

// export const sanitizeRoute: RequestHandler = (
//   req: SessionRequest,
//   res: Response
// ) => {
//   let { id, name, gameId } = req.mySession;
//   gameManager.registerPlayer({ id, name });
//   if (!gameManager.hasGame(gameId)) {
//     delete req.mySession.gameId;
//   }
//   res.send({ success: true });
// };

// export const forfeitRoute: RequestHandler = (
//   req: SessionRequest,
//   res: Response
// ) => {
//   let { gameId, id, name } = req.mySession;
//   gameManager.forfeitGame(gameId, { id, name });

//   res.send({ success: true });
// };

// export const cancelRoute: RequestHandler = (
//   req: SessionRequest,
//   res: Response
// ) => {
//   let { gameId, id } = req.mySession;
//   gameManager.leaveGame(gameId, id);
//   delete req.mySession.gameId;
//   res.send({ success: true });
// };

// apiRouteHandler.post("/validate", validateRoute);

// apiRouteHandler.post("/sanitize", sanitizeRoute);

// apiRouteHandler.post("/cancel", cancelRoute);

// apiRouteHandler.post("/forfeit", forfeitRoute);

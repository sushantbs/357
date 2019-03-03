import * as socket from "socket.io";
import { Server } from "http";
import gameManager from "./src/GameManager";
import { util } from "client-sessions";

let cookieMap: any = new WeakMap();

export default function(server: Server) {
  const io = socket(server, { path: "/api/socket" });

  io.use((socket, next) => {
    if (socket.request.headers.cookie) {
      let cookieStr: string = socket.request.headers.cookie;
      let cookiesArr: string[] = cookieStr.split(";");
      let cookieObj: any = {};

      cookiesArr.forEach((keyVal: string) => {
        let validKeyVal = keyVal.trim();
        if (validKeyVal) {
          let keyValPair = validKeyVal.split("=");
          cookieObj[keyValPair[0]] = keyValPair[1];
        }
      });

      cookieMap.set(socket.request, cookieObj);
    }
    return next();
  });

  io.on(`connection`, function(socket: socket.Socket) {
    let cookieObj = cookieMap.get(socket.request);

    if (cookieObj.mySession) {
      // read the session cookie
      let { content } = util.decode(
        { cookieName: "mySession", secret: "BadSecret" },
        cookieObj.mySession
      );
      let { id, avatar, handle } = content;
      if (content.id && content.accessKey) {
        gameManager.playerConnected(
          {
            id,
            avatar,
            handle,
            rtcReady: false,
            socket
          },
          content.accessKey
        );
      } else {
        socket.disconnect();
      }
    } else {
      // No session cookie
      socket.disconnect();
    }
  });

  gameManager.setSocketServer(io);
}

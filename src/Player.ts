import { Socket } from "socket.io";

export interface Player {
  id: string;
  avatar: string;
  handle: string;
  rtcReady: boolean;
}

export interface ConnectedPlayer extends Player {
  socket: Socket;
}

import { Socket } from "socket.io";

export interface Player {
  id: string;
}

export interface ConnectedPlayer extends Player {
  socket: Socket;
}

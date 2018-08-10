import { Socket } from "socket.io";

export interface Player {
  name: string;
  id: string;
}

export interface ConnectedPlayer extends Player {
  socket: Socket;
}

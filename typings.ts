// import { setupMaster } from "cluster";

//Server // from express
//... Fuck the setup
import { Request } from "express";

export interface SessionObject {
  handle: string;
  id: string;
  avatar: string;
  wins: number;
  losses: number;
  streak: number;
  longestStreak: number;
  accessKey: string;
  isCreator: boolean;
  destroy(): void;
}

export interface SessionRequest extends Request {
  mySession: SessionObject;
}

export interface Player {}

export interface Room {}

export interface RoomManager {
  roomMap: Map<string, Room>;
  post(options: { name: string; creator: string }): Room;

  get(options: { id: string }): Room;

  put(options: { id: string }): Room;

  delete(options: { id: string }): boolean;
}

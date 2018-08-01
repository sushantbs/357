import guid from "./guid";
import * as socket from "socket.io";
import { Map } from "core-js";

interface PlayerType {
  name: string;
  id: string;
  socket?: any;
}

interface GameManagerType {
  registerPlayer(p: PlayerType): void;
}

interface GameInterface {
  setId(id: string): void;
  addPlayers(players: PlayerType[]): void;
  playerConnected(player: PlayerType): void;
}

class Game implements GameInterface {
  private id: string;
  private players: PlayerType[] = [];

  public setId(id: string): void {
    this.id = id;
  }

  public addPlayers(players: PlayerType[]): void {
    players.forEach(player => {
      this.players.push(player);
    });
  }

  /**
   * playerConnected
   */
  public playerConnected(player: PlayerType) {
    let p: PlayerType = this.players.find(
      (item: PlayerType) => item.id === player.id
    );

    p.socket = player.socket;
    p.socket.join(this.id);

    if (
      this.players.length > 1 &&
      !this.players.find((p: PlayerType) => !p.socket)
    ) {
      this.start();
    }
  }

  /**
   * start
   */
  public start(): void {
    this.players.forEach(player => player.socket.emit("message", "game start"));
  }
}

class GameManager implements GameManagerType {
  private io: socket.Server;

  private registeredPlayers: any = new Map();
  private waitingPlayers: any = new Map();
  private pairedGames: any = new Map();
  private gameMap: any = new Map();

  public setSocketServer(io: socket.Server) {
    this.io = io;
  }

  public registerPlayer(p: PlayerType) {
    this.registeredPlayers.set(p.id, p);
  }

  public removePlayer(p: PlayerType) {
    this.registeredPlayers.delete(p.id);
  }

  /**
   * addToWaitingLounge
   */
  public addToWaitingLounge(p: PlayerType) {
    if (this.registeredPlayers.has(p.id)) {
      if (!this.waitingPlayers.size) {
        let gameId = this.setupGame([p]);
        this.waitingPlayers.set(gameId, [p]);
        return gameId;
      } else {
        let playerKeyVal: string[] = this.waitingPlayers.entries().next().value;
        let gameId: string = playerKeyVal[0];
        this.waitingPlayers.delete(gameId);
        let game = this.gameMap.get(gameId);
        game.addPlayers([p]);
        return gameId;
      }
    } else {
      // Fishy business happening here
      debugger;
    }
  }

  /**
   * pairPlayers
   */
  public setupGame(playerArray: PlayerType[]) {
    let game: GameInterface = new Game();
    let gameId: string = guid();
    game.setId(gameId);
    game.addPlayers(playerArray);
    this.gameMap.set(gameId, game);

    return gameId;
  }

  public playerConnected(player: PlayerType, gameId: string) {
    let game: GameInterface = this.gameMap.get(gameId);
    game.playerConnected(player);
  }

  /**
   * addPlayerAndStart
   */
  public addPlayerAndStart(playerArray: PlayerType[]) {}

  /**
   * getGameCount
   */
  public getGameCount(): number {
    return this.pairedGames.size;
  }
}

const gameManager = new GameManager();
export default gameManager;

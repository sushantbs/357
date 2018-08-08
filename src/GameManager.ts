import guid from "./guid";
import * as socket from "socket.io";
import { Map } from "core-js";
import Player from "./Player";
import Game from "./Game";

interface GameManagerType {
  registerPlayer(p: Player): void;
  hasGame(gameId: string): boolean;
  removePlayer(p: Player): void;
  forfeitGame(gameId: string, p: Player): void;
  addToWaitingLounge(p: Player): string;
  getGameWinner(gameId: string): Player;
  playerConnected(p: Player, gameId: string): void;
  setSocketServer(io: socket.Server): void;
  leaveGame(gameId: string, playerId: string): void;
  cancelGame(gameId: string, p: Player): void;
  getGameCount(): number;
}

class GameManager implements GameManagerType {
  private io: socket.Server;

  private registeredPlayers: any = new Map();
  private waitingPlayers: any = new Map();
  private gameMap: any = new Map();

  public setSocketServer(io: socket.Server) {
    this.io = io;
  }

  public registerPlayer(p: Player) {
    this.registeredPlayers.set(p.id, p);
  }

  public removePlayer(p: Player) {
    this.registeredPlayers.delete(p.id);
  }

  /**
   * addToWaitingLounge
   */
  public addToWaitingLounge(p: Player) {
    if (!this.waitingPlayers.size) {
      let gameId = this.setupGame([p]);
      this.waitingPlayers.set(gameId, [p]);
      console.log(
        `Adding player ${p.name}: ${p.id} to the game ${gameId} in wait mode.`
      );
      return gameId;
    } else {
      let playerKeyVal: string[] = this.waitingPlayers.entries().next().value;
      let gameId: string = playerKeyVal[0];
      this.waitingPlayers.delete(gameId);
      console.log(
        `Adding player ${p.name}: ${p.id} to the game ${gameId} in game mode.`
      );
      let game = this.gameMap.get(gameId);
      game.addPlayers([p]);
      return gameId;
    }
  }

  /**
   * hasGame
   */
  public hasGame(gameId: string) {
    return this.gameMap.has(gameId);
  }

  /**
   * pairPlayers
   */
  public setupGame(playerArray: Player[]) {
    let game: Game = new Game();
    let gameId: string = guid();
    game.setId(gameId);
    game.addPlayers(playerArray);
    this.gameMap.set(gameId, game);

    return gameId;
  }

  public playerConnected(player: Player, gameId: string) {
    let game: Game = this.gameMap.get(gameId);
    if (!game) {
      console.log(
        `game ${gameId} does not exist. disconnecting ${player.name}: ${
          player.id
        }`
      );
      player.socket.disconnect();
    } else {
      console.log(
        `player ${player.name}: ${player.id} has connected to ${gameId}`
      );
      game.playerConnected(player);
    }
  }

  /**
   * getGameCount
   */
  public getGameCount(): number {
    return this.gameMap.size;
  }

  /**
   * getGameWinner
   */
  public getGameWinner(gameId: string): Player {
    let gameInstance: Game = this.gameMap.get(gameId);
    if (gameInstance) {
      return gameInstance.getWinner();
    }
  }

  public forfeitGame(gameId: string, p: Player): void {
    let gameInstance: Game = this.gameMap.get(gameId);
    if (gameInstance) {
      gameInstance.forfeit(p);
    }
  }

  /**
   * cancelGame
   */
  public cancelGame() {}

  /**
   * leaveGame
   */
  public leaveGame(gameId: string, playerId: string): void {
    let gameInstance: Game = this.gameMap.get(gameId);
    gameInstance.removePlayer(playerId);
    if (gameInstance.isEmpty()) {
      this.gameMap.delete(gameId);
      // In case the player cancels a game before anyone joins
      if (this.waitingPlayers.has(gameId)) {
        this.waitingPlayers.delete(gameId);
      }
    }
  }
}

const gameManager: GameManagerType = new GameManager();
export default gameManager;

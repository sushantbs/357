import guid, { accessKeygen } from "./guid";
import * as socket from "socket.io";
import { Map } from "core-js";
import { Player, ConnectedPlayer } from "./Player";
import Game from "./Game";
import { SessionObject } from "../typings";
import { access } from "fs";
interface GameManagerType {
  registerPlayer(p: Player): void;
  getAccessKey(gameId: string): string;
  getGameByAccessKey(accessKey: string): Game;
  setupGame(type: string, players: Player[]): string;
  hasGame(gameId: string): boolean;
  removePlayer(playerId: string, accessKey: string): void;
  // forfeitGame(gameId: string, p: Player): void;
  addToWaitingLounge(p: Player): string;
  getGameWinner(gameId: string): Player;
  playerConnected(p: ConnectedPlayer, gameId: string): void;
  setSocketServer(io: socket.Server): void;
  leaveGame(gameId: string, playerId: string): void;
  extractStatsFromSession(session: SessionObject): void;
  getGameCount(): number;
  getGameStats(): { totalWins: any };
}

class GameManager implements GameManagerType {
  private io: socket.Server;
  private stats: { totalWins: any } = {
    totalWins: { count: 0, players: [] }
  };
  private registeredPlayers: Map<string, Player> = new Map();
  private waitingPlayers: any = new Map();
  private gameMap: Map<string, Game> = new Map();
  private gameAccessKeyMap: Map<string, Game> = new Map();
  private accessKeyMap: Map<string, string> = new Map();

  public setSocketServer(io: socket.Server) {
    this.io = io;
  }

  public getAccessKey(gameId: string) {
    let accessKey = this.gameMap.get(gameId).getAccessKey();
    return accessKey;
  }

  public registerPlayer(p: Player) {
    this.registeredPlayers.set(p.id, p);
  }

  public removePlayer(playerId: string, accessKey: string) {
    this.registeredPlayers.delete(playerId);

    const game = this.getGameByAccessKey(accessKey);
    game.removePlayer(playerId);
  }

  /** Live code */
  public addToWaitingLounge(p: Player) {
    if (!this.waitingPlayers.size) {
      let gameId = this.setupGame(null, [p]);
      this.waitingPlayers.set(gameId, p);
      console.log(`Adding player ${p.id} to the game ${gameId} in wait mode.`);
      return gameId;
    } else {
      let playerKeyVal: string[] = this.waitingPlayers.entries().next().value;
      let gameId: string = playerKeyVal[0];
      let player: Player = this.waitingPlayers.get(gameId);

      // Ensure player has been already added
      if (player.id !== p.id) {
        this.waitingPlayers.delete(gameId);
        console.log(
          `Adding player ${p.id} to the game ${gameId} in game mode.`
        );
        let game = this.gameMap.get(gameId);
        game.addPlayers([p]);
      }

      return gameId;
    }
  }

  public getGameByAccessKey(accessKey: string): Game {
    return this.gameAccessKeyMap.get(accessKey);
  }

  /** Live code */
  public setupGame(type: string, playerArray: Player[]) {
    let game = new Game();

    while (this.gameMap.has(game.getId())) {
      game = new Game();
    }

    let gameKey = accessKeygen();
    while (this.gameAccessKeyMap.has(gameKey)) {
      gameKey = accessKeygen();
    }

    let gameId = game.getId();
    game.setAccessKey(gameKey);
    game.addPlayers(playerArray);
    this.gameMap.set(gameId, game);
    this.gameAccessKeyMap.set(gameKey, game);

    return gameId;
  }

  public playerConnected(player: ConnectedPlayer, accessKey: string) {
    let game: Game = this.gameAccessKeyMap.get(accessKey);
    if (!game) {
      console.log(
        `game with access key ${accessKey} does not exist. disconnecting ${
          player.id
        }`
      );
      player.socket.disconnect();
    } else {
      console.log(`${player.id} has connected to ${accessKey}`);
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

  // public forfeitGame(gameId: string, p: ConnectedPlayer): void {
  //   let gameInstance: Game = this.gameMap.get(gameId);
  //   if (gameInstance) {
  //     gameInstance.forfeit(p);
  //   }
  // }

  public hasGame(gameId: string) {
    return this.gameMap.has(gameId);
  }

  public leaveGame(gameId: string, playerId: string): void {
    let gameInstance: Game = this.gameMap.get(gameId);

    gameInstance.removePlayer(playerId);
    console.log(`Player ${playerId} has left`);

    let accessKey = gameInstance.getAccessKey();
    if (gameInstance.isEmpty()) {
      this.gameMap.delete(gameId);
      this.gameAccessKeyMap.delete(accessKey);
      console.log(`Game ${gameId} has been deleted`);
      // In case the player cancels a game before anyone joins
      if (this.waitingPlayers.has(gameId)) {
        this.waitingPlayers.delete(gameId);
      }
    }
  }

  public extractStatsFromSession(session: SessionObject) {
    let { wins, losses, streak, longestStreak, handle, id } = session;

    // track total wins
    if (!this.stats.totalWins || wins > this.stats.totalWins.count) {
      this.stats.totalWins = {
        players: [
          {
            handle,
            id
          }
        ],
        count: wins
      };
    } else if (wins === this.stats.totalWins.count) {
      this.stats.totalWins.players.push({ handle, id });
    }
  }

  /**
   * getGameStats
   */
  public getGameStats() {
    return this.stats;
  }
}

const gameManager: GameManagerType = new GameManager();
export default gameManager;

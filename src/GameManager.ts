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
  hasGame(gameId: string): boolean;
  removePlayer(p: PlayerType): void;
  forfeitGame(gameId: string, p: PlayerType): void;
  addToWaitingLounge(p: PlayerType): string;
  getGameWinner(gameId: string): PlayerType;
  playerConnected(p: PlayerType, gameId: string): void;
  setSocketServer(io: socket.Server): void;
  leaveGame(gameId: string, playerId: string): void;
  cancelGame(gameId: string, p: PlayerType): void;
  getGameCount(): number;
}

interface GameInterface {
  setId(id: string): void;
  addPlayers(players: PlayerType[]): void;
  playerConnected(player: PlayerType): void;
  getWinner(): PlayerType;
  removePlayer(playerId: string): void;
  forfeit(p: PlayerType): boolean;
  isEmpty(): boolean;
}

class Game implements GameInterface {
  private id: string;
  private players: PlayerType[] = [];
  private turn: number = null;
  private winner: PlayerType = null;
  private tiles: [number, number, number] = [3, 5, 7];

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

    // This encapsulates the game in a socket.io room
    p.socket.join(this.id);

    p.socket.on("play", (turn: { tiles: [number, number, number] }) => {
      this.tiles = turn.tiles;
      this.turnPlayed(turn.tiles, p);
    });

    if (
      this.players.length > 1 &&
      !this.players.find((p: PlayerType) => !p.socket)
    ) {
      this.start();
    }
  }

  /**
   * removePlayer
   */
  public removePlayer(playerId: string): void {
    this.players = this.players.filter(player => player.id !== playerId);
  }

  /**
   * forfeit
   */
  public forfeit({ id }: PlayerType) {
    let player = this.players.find(p => p.id === id);
    let otherPlayer = this.players.find(p => p !== player);

    this.winner = otherPlayer;
    otherPlayer.socket.emit("end", { result: true, forfeit: true });
    player.socket.emit("end", { result: false, forfeit: true });

    return true;
  }

  public isEmpty(): boolean {
    return !this.players.length;
  }

  public turnPlayed(tiles: number[], player: PlayerType) {
    let otherPlayer: PlayerType = this.players.find((p, index) => {
      if (p !== player) {
        this.turn = index;
        return true;
      }
      return false;
    });
    let sum = tiles.reduce((total, num) => total + Number(num), 0);
    this.turn;
    otherPlayer.socket.emit("turn", { tiles });

    if (sum === 1) {
      this.winner = player;
      otherPlayer.socket.emit("end", { result: false });
      player.socket.emit("end", { result: true });
    } else if (!sum) {
      this.winner = otherPlayer;
      otherPlayer.socket.emit("end", { result: true });
      player.socket.emit("end", { result: false });
    }
  }

  public getWinner(): PlayerType {
    return this.winner;
  }

  /**
   * start
   */
  public start(): void {
    this.turn = this.turn !== null ? this.turn : Math.round(Math.random());
    this.players.forEach((player, index) =>
      player.socket.emit("start", {
        tiles: this.tiles,
        turn: this.turn === index
      })
    );
  }
}

class GameManager implements GameManagerType {
  private io: socket.Server;

  private registeredPlayers: any = new Map();
  private waitingPlayers: any = new Map();
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
  public getGameWinner(gameId: string): PlayerType {
    let gameInstance: GameInterface = this.gameMap.get(gameId);
    if (gameInstance) {
      return gameInstance.getWinner();
    }
  }

  public forfeitGame(gameId: string, p: PlayerType): void {
    let gameInstance: GameInterface = this.gameMap.get(gameId);
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
    let gameInstance: GameInterface = this.gameMap.get(gameId);
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

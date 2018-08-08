import Player from "./Player";

interface GameInterface {
  setId(id: string): void;
  addPlayers(players: Player[]): void;
  playerConnected(player: Player): void;
  getWinner(): Player;
  removePlayer(playerId: string): void;
  forfeit(p: Player): boolean;
  isEmpty(): boolean;
}

export default class Game implements GameInterface {
  private id: string;
  private players: Player[] = [];
  private turn: number = null;
  private winner: Player = null;
  private tiles: [number, number, number] = [3, 5, 7];

  public setId(id: string): void {
    this.id = id;
  }

  public addPlayers(players: Player[]): void {
    players.forEach(player => {
      this.players.push(player);
    });
  }

  /**
   * playerConnected
   */
  public playerConnected(player: Player) {
    let p: Player = this.players.find((item: Player) => item.id === player.id);

    p.socket = player.socket;

    // This encapsulates the game in a socket.io room
    p.socket.join(this.id);

    p.socket.on("play", (turn: { tiles: [number, number, number] }) => {
      this.tiles = turn.tiles;
      this.turnPlayed(turn.tiles, p);
    });

    if (
      this.players.length > 1 &&
      !this.players.find((p: Player) => !p.socket)
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
  public forfeit({ id }: Player) {
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

  public turnPlayed(tiles: number[], player: Player) {
    let otherPlayer: Player = this.players.find((p, index) => {
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

  public getWinner(): Player {
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

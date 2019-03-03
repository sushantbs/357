import guid from "./guid";
import { Player, ConnectedPlayer } from "./Player";

interface GameInterface {
  // setId(id: string): void;
  setAccessKey(id: string): void;
  addPlayers(players: Player[]): void;
  playerConnected(player: ConnectedPlayer): void;
  getWinner(): Player;
  removePlayer(playerId: string): void;
  broadcastPlayerList(): void;
  // forfeit(p: ConnectedPlayer): boolean;
  isEmpty(): boolean;
}

export default class Game implements GameInterface {
  private id: string;
  private accessKey: string;
  private players: (Player | ConnectedPlayer)[] = [];
  private turn: number = null;
  private winner: Player = null;

  constructor() {
    this.id = guid();
  }

  // public setId(id: string): void {
  //   this.id = id;
  // }

  /**
   * getId
   */
  public getId(): string {
    return this.id;
  }

  public setAccessKey(accessKey: string): void {
    this.accessKey = accessKey;
  }

  public getAccessKey(): string {
    return this.accessKey;
  }

  public addPlayer(player: Player): boolean {
    if (!this.players.find(p => p.id === player.id)) {
      this.players = [...this.players, player];
      return true;
    } else {
      return false;
    }
  }

  public addPlayers(players: Player[]): void {
    this.players = [...this.players, ...players];
  }

  /**
   * playerConnected
   */
  public playerConnected(player: ConnectedPlayer) {
    let p = <ConnectedPlayer>this.players.find(item => item.id === player.id);

    p.socket = player.socket;
    p.avatar = player.avatar;
    p.handle = player.handle;

    // This encapsulates the game in a socket.io room
    p.socket.join(this.id);

    console.log("broadcast player list");
    this.broadcastPlayerList();

    p.socket.on("turn", (turn: any) => this.onTurnPlayed(turn));
    p.socket.on("message", (message: string) =>
      this.onPlayerMessage(p.id, message)
    );

    p.socket.on("player", ({ avatar, handle, rtcReady }) => {
      Object.assign(p, { avatar, handle, rtcReady });
      this.broadcastPlayerList();
    });

    p.socket.on("icecandidate", payload =>
      (<ConnectedPlayer[]>this.players).forEach(
        player => player.socket && player.socket.emit("icecandidate", payload)
      )
    );

    p.socket.on("rtcOffer", ({ offerBy, offerTo, description }) => {
      const player = (<ConnectedPlayer[]>this.players).find(
        player => player.id === offerTo
      );
      player.socket &&
        player.socket.emit("rtcOffer", { offerBy, offerTo, description });
    });

    p.socket.on("rtcAnswer", ({ answerBy, answerTo, description }) => {
      const player = (<ConnectedPlayer[]>this.players).find(
        player => player.id === answerTo
      );
      player.socket &&
        player.socket.emit("rtcAnswer", { answerBy, answerTo, description });
    });
  }

  public broadcastPlayerList() {
    let connectedPlayers = (<ConnectedPlayer[]>this.players).filter(player =>
      Boolean(player.socket)
    );

    let playerListToSend = connectedPlayers.map(
      ({ id, avatar, handle, rtcReady }) => ({
        id,
        avatar,
        handle,
        rtcReady
      })
    );

    connectedPlayers.forEach(player =>
      player.socket.emit("players", playerListToSend)
    );
  }

  public onTurnPlayed(turn: any) {}

  public onPlayerMessage(playerId: string, message: string) {
    const payload = { text: message, author: playerId };
    (<ConnectedPlayer[]>this.players).forEach(
      p => p.socket && p.socket.emit("message", payload)
    );
  }

  /**
   * removePlayer
   */
  public removePlayer(playerId: string): void {
    this.players = (<ConnectedPlayer[]>this.players).filter(player => {
      if (player.id === playerId) {
        player.socket && player.socket.disconnect();
      } else {
        return true;
      }
    });
  }

  /**
   * forfeit
   */
  // public forfeit({ id }: ConnectedPlayer) {
  //   let player = <ConnectedPlayer>this.players.find(p => p.id === id);
  //   let otherPlayer = <ConnectedPlayer>this.players.find(p => p !== player);

  //   console.log(`${player.id} has forfeited`);
  //   this.winner = otherPlayer;

  //   otherPlayer.socket.emit("end", { result: true, forfeit: true });
  //   player.socket.emit("end", { result: false, forfeit: true });

  //   return true;
  // }

  public isEmpty(): boolean {
    return !this.players.length;
  }

  public turnPlayed(tiles: number[], player: ConnectedPlayer) {
    console.log(`${player}: ${player.id} has played`);

    let otherPlayer = <ConnectedPlayer>this.players.find((p, index) => {
      if (p !== player) {
        this.turn = index;
        return true;
      }
      return false;
    });
    let sum = tiles.reduce((total, num) => total + Number(num), 0);
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
    this.turn =
      this.turn !== null
        ? this.turn
        : Math.round(Math.random() * this.players.length);

    this.players.forEach((player: ConnectedPlayer, index) =>
      player.socket.emit("start", {
        turn: this.turn === index
      })
    );
  }
}

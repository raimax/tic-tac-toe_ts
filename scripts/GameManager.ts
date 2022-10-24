import { Player } from "./models/Player";
import { Rectangle } from "./models/Rectangle";

export class GameManager {
  private static winner: Player;
  private static boardSize: Rectangle = { width: 3, height: 3 };

  static setWinner(player: Player) {
    this.winner = player;
  }

  static getWinner(): Player {
    return this.winner;
  }

  static setBoardSize(size: Rectangle) {
    this.boardSize = size;
  }

  static getBoardSize(): Rectangle {
    return this.boardSize;
  }
}

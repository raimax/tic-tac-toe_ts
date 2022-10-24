import { GameState } from "../enums/GameState";
import { Game } from "../Game";
import { GameManager } from "../GameManager";
import { Draw } from "../helpers/Draw";
import { Player } from "../models/Player";
import { Rectangle } from "../models/Rectangle";
import { Vector2 } from "../models/Vector2";
import { Tile } from "../Tile";

export class Board {
  private gameInstance: Game;
  private tiles: Tile[] = [];
  private players: Player[] = [];
  private currentPlayer: Player;
  private gameOver: boolean = false;

  constructor(gameInstance: Game) {
    this.gameInstance = gameInstance;
  }

  init() {
    this.setupTiles(GameManager.getBoardSize());
    this.setupPlayers();
  }

  draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    this.drawBackground(ctx, windowSize);
    this.drawTiles(ctx, windowSize);
    this.drawTurnInfo(ctx);
  }

  update(windowSize: Rectangle) {
    this.updateTiles(windowSize);
    this.checkForDraw();
  }

  drawBackground(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    Draw.rectangle(
      ctx,
      { x: 0, y: 0 },
      { width: windowSize.width, height: windowSize.height },
      "DimGray"
    );
  }

  drawTurnInfo(ctx: CanvasRenderingContext2D) {
    Draw.rectangle(ctx, { x: 0, y: 50 }, { width: 230, height: 70 });
    Draw.text(
      `${this.getLastPlayer().name}'s turn`,
      ctx,
      { x: 10, y: 95 },
      "white",
      28
    );
  }

  drawTiles(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    this.tiles.forEach((tile) => {
      tile.draw(ctx, windowSize);
    });
  }

  updateTiles(windowSize: Rectangle) {
    this.tiles.forEach((tile) => {
      tile.update(windowSize);
    });
  }

  setupTiles(boradSize: Rectangle) {
    this.tiles = [];
    let id = 1;
    for (let i = 0; i < boradSize.height; i++) {
      for (let j = 0; j < boradSize.width; j++) {
        this.tiles.push(
          new Tile(
            id,
            { x: i, y: j },
            { x: j * 160, y: i * 160 },
            { x: boradSize.width * 75, y: boradSize.height * 75 },
            (tile: Tile) => {
              this.checkForWin(this.tiles, tile, this.getLastPlayer());
              return this.passCurrentPlayer();
            }
          )
        );
        id++;
      }
    }
  }

  setupPlayers() {
    this.players.push(new Player("Player 1", "images/o.png"));
    this.players.push(new Player("Player 2", "images/x.png"));

    this.currentPlayer = this.players[1];
  }

  passCurrentPlayer(): Player {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
    return this.currentPlayer;
  }

  getMoveCount(): number {
    let moves: number = 0;
    this.tiles.forEach((tile) => {
      if (tile.isTaken()) moves++;
    });
    return moves;
  }

  checkForDraw() {
    if (this.tiles.length === this.getMoveCount()) {
      this.gameOver = true;
      GameManager.setWinner(null);
      this.gameInstance.setGameState(GameState.END);
    }
  }

  checkForWin(tiles: Tile[], tile: Tile, player: Player) {
    this.checkLeftHorizontal(tiles, tile.getId() - 1, player);
    this.checkRightHorizontal(tiles, tile.getId() - 1, player);
    this.checkAdjacentHorizontal(tiles, tile.getId() - 1, player);

    this.checkBottomVertical(tiles, tile.getId() - 1, player);
    this.checkTopVertical(tiles, tile.getId() - 1, player);
    this.checkAdjacentVertical(tiles, tile.getId() - 1, player);

    this.checkLeftBottomDiagonal(tiles, tile.getId() - 1, player);
    this.checkRightBottomDiagonal(tiles, tile.getId() - 1, player);
    this.checkLeftTopDiagonal(tiles, tile.getId() - 1, player);
    this.checkRightTopDiagonal(tiles, tile.getId() - 1, player);

    this.checkLeftAdjacentDiagonal(tiles, tile.getId() - 1, player);
    this.checkRightAdjacentDiagonal(tiles, tile.getId() - 1, player);
  }

  getLeftTile(tiles: Tile[], i: number, player: Player): Tile | null {
    //check if not out of bounds
    if (!this.isOutOfBoundsVerticalLeft(tiles, i)) {
      //check if horizontal
      if (this.isHorizontal(tiles[i - 1], tiles[i].getCoordinates())) {
        //check if from same player
        if (tiles[i - 1].getPlayer()?.name === player.name) {
          return tiles[i - 1];
        }
      }
    }
    return null;
  }

  isHorizontal(tile: Tile, coordinates: Vector2): boolean {
    if (tile.getCoordinates().x === coordinates.x) return true;
    return false;
  }

  checkLeftHorizontal(tiles: Tile[], i: number, player: Player) {
    //check left
    const leftTile = this.getLeftTile(tiles, i, player);
    if (leftTile) {
      //check left tile of left tile
      const leftOfLeftTile = this.getLeftTile(
        tiles,
        leftTile.getId() - 1,
        player
      );
      if (leftOfLeftTile) {
        this.onWin();
      }
    }
  }

  checkRightHorizontal(tiles: Tile[], i: number, player: Player) {
    //check right
    const rightTile = this.getRightTile(tiles, i, player);
    if (rightTile) {
      //check right tile of right tile
      const rightOfRightTile = this.getRightTile(
        tiles,
        rightTile.getId() - 1,
        player
      );
      if (rightOfRightTile) {
        this.onWin();
      }
    }
  }

  getRightTile(tiles: Tile[], i: number, player: Player): Tile | null {
    //check if not out of bounds
    if (!this.isOutOfBoundsVerticalRight(tiles, i)) {
      //check if horizontal
      if (this.isHorizontal(tiles[i + 1], tiles[i].getCoordinates())) {
        //check if from same player
        if (tiles[i + 1].getPlayer()?.name === player.name) {
          return tiles[i + 1];
        }
      }
    }
    return null;
  }

  checkBottomVertical(tiles: Tile[], i: number, player: Player) {
    //check right
    const bottomTile = this.getBottomTile(tiles, i, player);
    if (bottomTile) {
      //check right tile of right tile
      const rightOfBottomTile = this.getBottomTile(
        tiles,
        bottomTile.getId() - 1,
        player
      );
      if (rightOfBottomTile) {
        this.onWin();
      }
    }
  }

  getBottomTile(tiles: Tile[], i: number, player: Player): Tile | null {
    //check if not out of bounds
    if (!this.isOutOfBoundsVerticalRight(tiles, i)) {
      for (let j = i + 1; j < tiles.length; j++) {
        //check if vertical
        if (tiles[j].getCoordinates().y === tiles[i].getCoordinates().y) {
          //check if from same player
          if (tiles[j].getPlayer()?.name === player.name) {
            return tiles[j];
          }
        }
      }
    }
    return null;
  }

  // isOutOfBoundsHorizontal(tiles: Tile[], i: number): boolean {
  //   if (Math.sign(i - 1) < 0) {
  //     return true;
  //   } else if (tiles.length <= i + 1) {
  //     return true;
  //   }
  //   return false;
  // }

  isOutOfBoundsVerticalRight(tiles: Tile[], i: number): boolean {
    if (tiles.length <= i + 1) {
      return true;
    }
    return false;
  }

  isOutOfBoundsVerticalLeft(tiles: Tile[], i: number): boolean {
    if (0 > i - 1) {
      return true;
    }
    return false;
  }

  checkTopVertical(tiles: Tile[], i: number, player: Player) {
    //check right
    const topTile = this.getTopTile(tiles, i, player);
    if (topTile) {
      //check right tile of right tile
      const rightOfTopTile = this.getTopTile(
        tiles,
        topTile.getId() - 1,
        player
      );
      if (rightOfTopTile) {
        this.onWin();
      }
    }
  }

  getTopTile(tiles: Tile[], i: number, player: Player): Tile | null {
    //check if not out of bounds
    if (!this.isOutOfBoundsVerticalLeft(tiles, i)) {
      for (let j = i - 1; j >= 0; j--) {
        //check if vertical
        if (tiles[j].getCoordinates().y === tiles[i].getCoordinates().y) {
          //check if from same player
          if (tiles[j].getPlayer()?.name === player.name) {
            return tiles[j];
          }
        }
      }
    }
    return null;
  }

  checkAdjacentHorizontal(tiles: Tile[], i: number, player: Player) {
    //check left
    const leftTile = this.getLeftTile(tiles, i, player);
    if (leftTile) {
      //check right
      const rightTile = this.getRightTile(tiles, i, player);
      if (rightTile) {
        this.onWin();
      }
    }
  }

  checkAdjacentVertical(tiles: Tile[], i: number, player: Player) {
    //check left
    const leftTile = this.getTopTile(tiles, i, player);
    if (leftTile) {
      //check right
      const rightTile = this.getBottomTile(tiles, i, player);
      if (rightTile) {
        this.onWin();
      }
    }
  }

  onWin() {
    this.gameOver = true;
    GameManager.setWinner(this.getLastPlayer());
    this.gameInstance.setGameState(GameState.END);
  }

  getLastPlayer(): Player {
    return this.players[0].name !== this.currentPlayer.name
      ? this.players[0]
      : this.players[1];
  }

  checkLeftBottomDiagonal(tiles: Tile[], i: number, player: Player) {
    //check left
    const leftTile = this.getLeftBottomDiagonalTile(tiles, i, player);
    if (leftTile) {
      //check left tile of left tile
      const leftOfLeftTile = this.getLeftBottomDiagonalTile(
        tiles,
        leftTile.getId() - 1,
        player
      );
      if (leftOfLeftTile) {
        this.onWin();
      }
    }
  }

  checkRightBottomDiagonal(tiles: Tile[], i: number, player: Player) {
    //check right
    const rightTile = this.getRightBottomDiagonalTile(tiles, i, player);
    if (rightTile) {
      //check right tile of Right tile
      const rightOfRightTile = this.getRightBottomDiagonalTile(
        tiles,
        rightTile.getId() - 1,
        player
      );
      if (rightOfRightTile) {
        this.onWin();
      }
    }
  }

  getLeftBottomDiagonalTile(
    tiles: Tile[],
    i: number,
    player: Player
  ): Tile | null {
    //get left
    const leftTileIndex = tiles.find(
      (x) =>
        x.getCoordinates().x === tiles[i].getCoordinates().x + 1 &&
        x.getCoordinates().y === tiles[i].getCoordinates().y - 1
    );
    if (leftTileIndex) {
      //check if from same player
      if (leftTileIndex.getPlayer()?.name === player.name) {
        return leftTileIndex;
      }
    }

    return null;
  }

  getRightBottomDiagonalTile(
    tiles: Tile[],
    i: number,
    player: Player
  ): Tile | null {
    //get right
    const rightTileIndex = tiles.find(
      (x) =>
        x.getCoordinates().x === tiles[i].getCoordinates().x + 1 &&
        x.getCoordinates().y === tiles[i].getCoordinates().y + 1
    );
    if (rightTileIndex) {
      //check if from same player
      if (rightTileIndex.getPlayer()?.name === player.name) {
        return rightTileIndex;
      }
    }

    return null;
  }

  checkLeftTopDiagonal(tiles: Tile[], i: number, player: Player) {
    //check left
    const leftTile = this.getLeftTopDiagonalTile(tiles, i, player);
    if (leftTile) {
      //check left tile of left tile
      const leftOfLeftTile = this.getLeftTopDiagonalTile(
        tiles,
        leftTile.getId() - 1,
        player
      );
      if (leftOfLeftTile) {
        this.onWin();
      }
    }
  }

  getLeftTopDiagonalTile(
    tiles: Tile[],
    i: number,
    player: Player
  ): Tile | null {
    //get left
    const leftTileIndex = tiles.find(
      (x) =>
        x.getCoordinates().x === tiles[i].getCoordinates().x - 1 &&
        x.getCoordinates().y === tiles[i].getCoordinates().y - 1
    );

    if (leftTileIndex) {
      //check if from same player
      if (leftTileIndex.getPlayer()?.name === player.name) {
        return leftTileIndex;
      }
    }

    return null;
  }

  checkRightTopDiagonal(tiles: Tile[], i: number, player: Player) {
    //check left
    const leftTile = this.getRightTopDiagonalTile(tiles, i, player);
    if (leftTile) {
      //check left tile of left tile
      const leftOfLeftTile = this.getRightTopDiagonalTile(
        tiles,
        leftTile.getId() - 1,
        player
      );
      if (leftOfLeftTile) {
        this.onWin();
      }
    }
  }

  getRightTopDiagonalTile(
    tiles: Tile[],
    i: number,
    player: Player
  ): Tile | null {
    //get left
    const leftTileIndex = tiles.find(
      (x) =>
        x.getCoordinates().x === tiles[i].getCoordinates().x - 1 &&
        x.getCoordinates().y === tiles[i].getCoordinates().y + 1
    );

    if (leftTileIndex) {
      //check if from same player
      if (leftTileIndex.getPlayer()?.name === player.name) {
        return leftTileIndex;
      }
    }

    return null;
  }

  checkLeftAdjacentDiagonal(tiles: Tile[], i: number, player: Player) {
    //check left
    const leftBottomTile = this.getLeftBottomDiagonalTile(tiles, i, player);
    if (leftBottomTile) {
      //check right
      const rightTopTile = this.getRightTopDiagonalTile(
        tiles,
        tiles[i].getId() - 1,
        player
      );
      if (rightTopTile) {
        this.onWin();
      }
    }
  }

  checkRightAdjacentDiagonal(tiles: Tile[], i: number, player: Player) {
    //check left
    const leftBottomTile = this.getLeftTopDiagonalTile(tiles, i, player);
    if (leftBottomTile) {
      //check right
      const rightTopTile = this.getRightBottomDiagonalTile(
        tiles,
        tiles[i].getId() - 1,
        player
      );
      if (rightTopTile) {
        this.onWin();
      }
    }
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  setIsGameOver(value: boolean) {
    this.gameOver = value;
  }
}

import { Game } from "../Game.js";
import { Draw } from "../helpers/Draw.js";
import { Rectangle } from "../models/Rectangle.js";
import { Tile } from "../Tile.js";

export class Map {
  private gameInstance: Game;
  private tiles: Tile[] = [];

  constructor(gameInstance: Game) {
    this.gameInstance = gameInstance;
  }

  draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    this.drawBackground(ctx, windowSize);
    this.drawTiles(ctx, windowSize);
  }

  update(windowSize: Rectangle) {
    this.updateTiles(windowSize);
  }

  drawBackground(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    Draw.rectangle(
      ctx,
      { x: 0, y: 0 },
      { width: windowSize.width, height: windowSize.height },
      "DimGray"
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
}

import { Rectangle } from "./models/Rectangle.js";
import { Vector2 } from "./models/Vector2.js";

export class Tile {
  private position: Vector2;
  private size: Rectangle = { width: 150, height: 150 };

  constructor(position: Vector2) {
    this.position = position;
  }

  draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {}

  update(windowSize: Rectangle) {}
}

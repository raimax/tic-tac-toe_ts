import { Rectangle } from "../models/Rectangle.js";

export class Draw {
  static clearScreen(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    ctx.clearRect(0, 0, windowSize.width, windowSize.height);
  }
}

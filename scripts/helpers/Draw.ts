import { Rectangle } from "../models/Rectangle.js";
import { Vector2 } from "../models/Vector2.js";

export class Draw {
  static clearScreen(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    ctx.clearRect(0, 0, windowSize.width, windowSize.height);
  }

  static rectangle(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    size: Rectangle,
    color: string = "black"
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, size.width, size.height);
  }

  static text(
    text: string,
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    color: string = "white",
		fontSize?: number
  ) {
    ctx.font = `${fontSize || 48}px Verdana`;
    ctx.fillStyle = color;
    ctx.fillText(text, position.x, position.y);
  }

  static boxText(
    text: string,
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    box: Rectangle,
    color: string = "white",
		fontSize?: number
  ) {
    ctx.font = `${fontSize || 48}px Verdana`;
    const textWidth = ctx.measureText(text);
    ctx.fillStyle = color;
    ctx.fillText(
      text,
      position.x + box.width / 2 - textWidth.width / 2,
      position.y + 65
    );
  }

  static image(
    image: CanvasImageSource,
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    box: Rectangle
  ) {
    ctx.drawImage(image, position.x, position.y);
  }
}

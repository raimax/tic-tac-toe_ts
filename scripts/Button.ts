import { Draw } from "./helpers/Draw";
import { Input } from "./helpers/Input";
import { Rectangle } from "./models/Rectangle";
import { Vector2 } from "./models/Vector2";

export class Button {
  text: string;
  position: Vector2 = { x: 0, y: 0 };
  size: Rectangle = { width: 250, height: 100 };
  command: Function;
  color: string = "black";
  hoverColor: string = "white";
  textColor: string = "white";
  textHoverColor: string = "black";
  yOffset: number;

  constructor(text: string, command: Function) {
    this.text = text;
    this.command = command;
    this.yOffset = 0;
  }

  draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    Draw.rectangle(ctx, this.position, this.size, this.color);
    Draw.boxText(this.text, ctx, this.position, this.size, this.textColor);

    if (this.isBeingHovered(windowSize)) {
      Draw.rectangle(ctx, this.position, this.size, this.hoverColor);
      Draw.boxText(
        this.text,
        ctx,
        this.position,
        this.size,
        this.textHoverColor
      );
    }
  }

  update(windowSize: Rectangle) {
    this.updatePosition(windowSize);

    if (this.isBeingClicked(windowSize)) {
      this.command();
      Input.resetClickPos();
    }
  }

  updatePosition(windowSize: Rectangle) {
    this.position = {
      x: windowSize.width / 2 - this.size.width / 2,
      y: windowSize.height / 2 - this.size.height / 2 + this.yOffset,
    };
  }

  isBeingHovered(windowSize: Rectangle): boolean {
    if (
      Input.getMousePos().x >= windowSize.width / 2 - this.size.width / 2 &&
      Input.getMousePos().x <= windowSize.width / 2 + this.size.width / 2 &&
      Input.getMousePos().y >= this.position.y &&
      Input.getMousePos().y <= this.position.y + this.size.height
    ) {
      return true;
    }
    return false;
  }

  isBeingClicked(windowSize: Rectangle): boolean {
    if (
      Input.getMouseClickPos().x >=
        windowSize.width / 2 - this.size.width / 2 &&
      Input.getMouseClickPos().x <=
        windowSize.width / 2 + this.size.width / 2 &&
      Input.getMouseClickPos().y >= this.position.y &&
      Input.getMouseClickPos().y <= this.position.y + this.size.height
    ) {
      return true;
    }
    return false;
  }

  addToYOffset(offset: number) {
    this.yOffset += offset;
  }

  subtractFromYOffset(offset: number) {
    this.yOffset -= offset;
  }
}

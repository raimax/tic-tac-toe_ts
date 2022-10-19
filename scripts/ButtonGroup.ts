import { Button } from "./Button.js";
import { Rectangle } from "./models/Rectangle.js";

export class ButtonGroup {
  private buttons: Button[] = [];
	private spaceBetween: number = 150;

  constructor() {}

  draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    this.buttons.forEach((button) => {
      button.draw(ctx, windowSize);
    });
  }

  update(windowsSize: Rectangle) {
    this.buttons.forEach((button) => {
      button.update(windowsSize);
    });
  }

  getButtons(): Button[] {
    return this.buttons;
  }

  setButtons(buttons: Button[]) {
    const length: number = buttons.length;
    buttons.forEach((button, index) => {
      if (length > 1) {
				button.subtractFromYOffset(length * 56);
			}
      if (index > 0 && index < length) {
        button.addToYOffset(index * this.spaceBetween);
      }
      this.buttons.push(button);
    });
  }
}

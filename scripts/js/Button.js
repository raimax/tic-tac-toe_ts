import { Draw } from "./helpers/Draw.js";
import { Input } from "./helpers/Input.js";
export class Button {
    constructor(text, command) {
        this.position = { x: 0, y: 0 };
        this.size = { width: 250, height: 100 };
        this.color = "black";
        this.hoverColor = "white";
        this.textColor = "white";
        this.textHoverColor = "black";
        this.text = text;
        this.command = command;
        this.yOffset = 0;
    }
    draw(ctx, windowSize) {
        Draw.rectangle(ctx, this.position, this.size, this.color);
        Draw.boxText(this.text, ctx, this.position, this.size, this.textColor);
        if (this.isBeingHovered(windowSize)) {
            Draw.rectangle(ctx, this.position, this.size, this.hoverColor);
            Draw.boxText(this.text, ctx, this.position, this.size, this.textHoverColor);
        }
    }
    update(windowSize) {
        this.updatePosition(windowSize);
        if (this.isBeingClicked(windowSize)) {
            this.command();
            Input.resetClickPos();
        }
    }
    updatePosition(windowSize) {
        this.position = {
            x: windowSize.width / 2 - this.size.width / 2,
            y: windowSize.height / 2 - this.size.height / 2 + this.yOffset,
        };
    }
    isBeingHovered(windowSize) {
        if (Input.getMousePos().x >= windowSize.width / 2 - this.size.width / 2 &&
            Input.getMousePos().x <= windowSize.width / 2 + this.size.width / 2 &&
            Input.getMousePos().y >= this.position.y &&
            Input.getMousePos().y <= this.position.y + this.size.height) {
            return true;
        }
        return false;
    }
    isBeingClicked(windowSize) {
        if (Input.getMouseClickPos().x >=
            windowSize.width / 2 - this.size.width / 2 &&
            Input.getMouseClickPos().x <=
                windowSize.width / 2 + this.size.width / 2 &&
            Input.getMouseClickPos().y >= this.position.y &&
            Input.getMouseClickPos().y <= this.position.y + this.size.height) {
            return true;
        }
        return false;
    }
    addToYOffset(offset) {
        this.yOffset += offset;
    }
    subtractFromYOffset(offset) {
        this.yOffset -= offset;
    }
}
//# sourceMappingURL=Button.js.map
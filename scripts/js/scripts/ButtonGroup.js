export class ButtonGroup {
    constructor() {
        this.buttons = [];
        this.spaceBetween = 150;
    }
    draw(ctx, windowSize) {
        this.buttons.forEach((button) => {
            button.draw(ctx, windowSize);
        });
    }
    update(windowsSize) {
        this.buttons.forEach((button) => {
            button.update(windowsSize);
        });
    }
    getButtons() {
        return this.buttons;
    }
    setButtons(buttons) {
        const length = buttons.length;
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
//# sourceMappingURL=ButtonGroup.js.map
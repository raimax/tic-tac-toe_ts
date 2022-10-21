import { Draw } from "./helpers/Draw.js";
import { Input } from "./helpers/Input.js";
export class Tile {
    constructor(id, coordinates, position, offset, command) {
        this.size = { width: 150, height: 150 };
        this.isTakenByPlayer = null;
        this.id = id;
        this.coordinates = coordinates;
        this.position = position;
        this.offset = offset;
        this.command = command;
    }
    draw(ctx, windowSize) {
        Draw.rectangle(ctx, {
            x: this.position.x + windowSize.width / 2 - this.offset.x,
            y: this.position.y + windowSize.height / 2 - this.offset.y,
        }, this.size, "white");
        if (this.isTakenByPlayer) {
            Draw.image(this.isTakenByPlayer.image, ctx, {
                x: this.position.x + windowSize.width / 2 - this.offset.x,
                y: this.position.y + windowSize.height / 2 - this.offset.y,
            }, this.size);
        }
    }
    update(windowSize) {
        if (this.isBeingClicked(windowSize)) {
            if (this.isTakenByPlayer === null) {
                this.isTakenByPlayer = this.command(this);
            }
            Input.resetClickPos();
        }
    }
    isBeingHovered(windowSize) {
        if (Input.getMousePos().x >=
            this.position.x + windowSize.width / 2 - this.offset.x &&
            Input.getMousePos().x <=
                this.position.x +
                    windowSize.width / 2 +
                    this.size.width -
                    this.offset.x &&
            Input.getMousePos().y >=
                this.position.y + windowSize.height / 2 - this.offset.y &&
            Input.getMousePos().y <=
                this.position.y +
                    windowSize.height / 2 +
                    this.size.height -
                    this.offset.y) {
            return true;
        }
        return false;
    }
    isBeingClicked(windowSize) {
        if (Input.getMouseClickPos().x >=
            this.position.x + windowSize.width / 2 - this.offset.x &&
            Input.getMouseClickPos().x <=
                this.position.x +
                    windowSize.width / 2 +
                    this.size.width -
                    this.offset.x &&
            Input.getMouseClickPos().y >=
                this.position.y + windowSize.height / 2 - this.offset.y &&
            Input.getMouseClickPos().y <=
                this.position.y +
                    windowSize.height / 2 +
                    this.size.height -
                    this.offset.y) {
            return true;
        }
        return false;
    }
    isTaken() {
        return !!this.isTakenByPlayer;
    }
    getPlayer() {
        return this.isTakenByPlayer;
    }
    getId() {
        return this.id;
    }
    getCoordinates() {
        return this.coordinates;
    }
}
//# sourceMappingURL=Tile.js.map
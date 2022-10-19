export class Input {
    static getMousePos() {
        return this.mousePos;
    }
    static setMousePos(position) {
        this.mousePos = position;
    }
    static getMouseClickPos() {
        return this.mouseClickPos;
    }
    static setMouseClickPos(position) {
        this.mouseClickPos = position;
    }
    static resetClickPos() {
        this.mouseClickPos = { x: -999, y: -999 };
    }
}
Input.mousePos = { x: -999, y: -999 };
Input.mouseClickPos = { x: -999, y: -999 };
//# sourceMappingURL=Input.js.map
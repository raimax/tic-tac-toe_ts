import { Draw } from "./helpers/Draw.js";
import { GameState } from "./enums/GameState.js";
export class Game {
    constructor(ctx) {
        this.gameState = GameState.START;
        this.ctx = ctx;
    }
    init() { }
    draw(ctx) {
        Draw.clearScreen(this.ctx, this.windowSize);
        switch (this.gameState) {
            case GameState.START:
                break;
            case GameState.GAMEPLAY:
                break;
            case GameState.END:
                break;
            default:
                break;
        }
    }
    update() {
        switch (this.gameState) {
            case GameState.START:
                break;
            case GameState.GAMEPLAY:
                break;
            case GameState.END:
                break;
            default:
                break;
        }
    }
    gameLoop() {
        requestAnimationFrame(() => {
            this.gameLoop();
        });
        this.update();
        this.draw(this.ctx);
    }
    setWindowSize(rectangle) {
        this.windowSize = rectangle;
    }
}
//# sourceMappingURL=Game.js.map
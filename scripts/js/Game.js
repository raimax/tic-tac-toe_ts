import { Draw } from "./helpers/Draw.js";
import { GameState } from "./enums/GameState.js";
import { MainManu } from "./states/MainMenu.js";
import { Board } from "./states/Board.js";
export class Game {
    constructor(ctx) {
        this.windowSize = { width: 1920, height: 1080 };
        this.gameState = GameState.GAMEPLAY;
        this.mainMenu = new MainManu(this);
        this.board = new Board(this);
        this.ctx = ctx;
    }
    init() {
        this.mainMenu.init();
        this.board.init();
    }
    draw(ctx, windowSize) {
        Draw.clearScreen(ctx, windowSize);
        switch (this.gameState) {
            case GameState.START:
                this.mainMenu.draw(ctx, windowSize);
                break;
            case GameState.GAMEPLAY:
                this.board.draw(ctx, windowSize);
                break;
            case GameState.END:
                break;
            default:
                break;
        }
    }
    update(windowSize) {
        switch (this.gameState) {
            case GameState.START:
                this.mainMenu.update(windowSize);
                break;
            case GameState.GAMEPLAY:
                this.board.update(windowSize);
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
        this.update(this.windowSize);
        this.draw(this.ctx, this.windowSize);
    }
    setWindowSize(rectangle) {
        this.windowSize = rectangle;
    }
    getWindowSize() {
        return this.windowSize;
    }
    setGameState(gameState) {
        this.gameState = gameState;
    }
}
//# sourceMappingURL=Game.js.map
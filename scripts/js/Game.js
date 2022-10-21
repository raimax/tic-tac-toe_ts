import { Draw } from "./helpers/Draw.js";
import { GameState } from "./enums/GameState.js";
import { MainManu } from "./states/MainMenu.js";
import { Board } from "./states/Board.js";
import { EndMenu } from "./states/EndMenu.js";
import { BoardSelect } from "./states/BoardSelect.js";
export class Game {
    constructor(ctx) {
        this.windowSize = { width: 1920, height: 1080 };
        this.gameState = GameState.START;
        this.mainMenu = new MainManu(this);
        this.boardSelect = new BoardSelect(this);
        this.board = new Board(this);
        this.endMenu = new EndMenu(this);
        this.ctx = ctx;
    }
    init() {
        this.mainMenu.init();
        this.boardSelect.init();
        this.endMenu.init();
    }
    draw(ctx, windowSize) {
        Draw.clearScreen(ctx, windowSize);
        switch (this.gameState) {
            case GameState.START:
                this.mainMenu.draw(ctx, windowSize);
                break;
            case GameState.BOARD_SELECT:
                this.boardSelect.draw(ctx, windowSize);
                break;
            case GameState.GAMEPLAY:
                if (this.board.isGameOver()) {
                    this.board = new Board(this);
                    this.board.init();
                }
                this.board.draw(ctx, windowSize);
                break;
            case GameState.END:
                this.endMenu.draw(ctx, windowSize);
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
            case GameState.BOARD_SELECT:
                this.boardSelect.update(windowSize);
                break;
            case GameState.GAMEPLAY:
                this.board.update(windowSize);
                break;
            case GameState.END:
                this.endMenu.update(windowSize);
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
    getBoard() {
        return this.board;
    }
}
//# sourceMappingURL=Game.js.map
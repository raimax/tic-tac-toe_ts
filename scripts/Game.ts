import { Rectangle } from "./models/Rectangle";
import { Draw } from "./helpers/Draw";
import { GameState } from "./enums/GameState";
import { MainManu } from "./states/MainMenu";
import { Board } from "./states/Board";
import { EndMenu } from "./states/EndMenu";
import { BoardSelect } from "./states/BoardSelect";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private windowSize: Rectangle = { width: 1920, height: 1080 };
  private gameState: GameState = GameState.START;
  private mainMenu: MainManu = new MainManu(this);
  private boardSelect: BoardSelect = new BoardSelect(this);
  private board: Board = new Board(this);
  private endMenu: EndMenu = new EndMenu(this);

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  init() {
    this.mainMenu.init();
    this.boardSelect.init();
    this.endMenu.init();
  }

  private draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
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

  private update(windowSize) {
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

  setWindowSize(rectangle: Rectangle) {
    this.windowSize = rectangle;
  }

  getWindowSize(): Rectangle {
    return this.windowSize;
  }

  setGameState(gameState: GameState) {
    this.gameState = gameState;
  }

	getBoard() {
		return this.board;
	}
}

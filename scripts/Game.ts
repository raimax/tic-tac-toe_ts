import { Rectangle } from "./models/Rectangle.js";
import { Draw } from "./helpers/Draw.js";
import { GameState } from "./enums/GameState.js";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private windowSize: Rectangle;
  private gameState: GameState = GameState.START;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  init() {}

  private draw(ctx: CanvasRenderingContext2D) {
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

  private update() {
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

  setWindowSize(rectangle: Rectangle) {
    this.windowSize = rectangle;
  }
}

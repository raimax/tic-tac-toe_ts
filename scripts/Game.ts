import { Rectangle } from "./models/Rectangle.js";
import { Draw } from "./helpers/Draw.js";
import { GameState } from "./enums/GameState.js";
import { MainManu } from "./states/MainMenu.js";
import { Map } from "./states/Map.js";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private windowSize: Rectangle = { width: 1920, height: 1080 };
  private gameState: GameState = GameState.START;
  private mainMenu: MainManu = new MainManu(this);
  private map: Map = new Map(this);

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  init() {
    this.mainMenu.init();
  }

  private draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    Draw.clearScreen(ctx, windowSize);

    switch (this.gameState) {
      case GameState.START:
        this.mainMenu.draw(ctx, windowSize);
        break;
      case GameState.GAMEPLAY:
        this.map.draw(ctx, windowSize);
        break;
      case GameState.END:
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
      case GameState.GAMEPLAY:
        this.map.update(windowSize);
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

  setWindowSize(rectangle: Rectangle) {
    this.windowSize = rectangle;
  }

  getWindowSize(): Rectangle {
    return this.windowSize;
  }

  setGameState(gameState: GameState) {
    this.gameState = gameState;
  }
}

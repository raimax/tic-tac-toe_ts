import { Button } from "../Button.js";
import { ButtonGroup } from "../ButtonGroup.js";
import { GameState } from "../enums/GameState.js";
import { Game } from "../Game.js";
import { GameManager } from "../GameManager.js";
import { Draw } from "../helpers/Draw.js";
import { Rectangle } from "../models/Rectangle.js";

export class EndMenu {
  private buttonGroup: ButtonGroup = new ButtonGroup();
  private gameInstance: Game;

  constructor(gameInstance: Game) {
    this.gameInstance = gameInstance;
  }

  init() {
    this.initButtons();
  }

  draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
		this.drawBackground(ctx, windowSize);
    this.buttonGroup.draw(ctx, windowSize);
    this.drawWinner(ctx, windowSize);
  }

  drawBackground(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    Draw.rectangle(
      ctx,
      { x: 0, y: 0 },
      { width: windowSize.width, height: windowSize.height },
      "DarkSlateGrey"
    );
  }

  drawWinner(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    if (GameManager.getWinner()) {
      Draw.text("Winner", ctx, { x: 50, y: 100 });
      Draw.image(
        GameManager.getWinner().image,
        ctx,
        { x: 50, y: 150 },
        { width: 0, height: 200 }
      );
    }
		else {
			Draw.text("Draw", ctx, { x: windowSize.width / 2 - 60, y: 100 });
		}
  }

  update(windowSize: Rectangle) {
    this.buttonGroup.update(windowSize);
  }

  initButtons() {
    this.buttonGroup.setButtons([
      new Button("Play again", () => {
        this.gameInstance.setGameState(GameState.GAMEPLAY);
      }),
      new Button("Back", () => {
        this.gameInstance.setGameState(GameState.START);
      }),
    ]);
  }
}

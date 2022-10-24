import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { GameState } from "../enums/GameState";
import { Game } from "../Game";
import { Draw } from "../helpers/Draw";
import { Rectangle } from "../models/Rectangle";

export class MainManu {
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
  }

  drawBackground(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    Draw.rectangle(
      ctx,
      { x: 0, y: 0 },
      { width: windowSize.width, height: windowSize.height },
      "DarkSlateGrey"
    );
  }

  update(windowSize: Rectangle) {
    this.buttonGroup.update(windowSize);
  }

  initButtons() {
    this.buttonGroup.setButtons([
      new Button("Play", () => {
        this.gameInstance.setGameState(GameState.BOARD_SELECT);
      }),
    ]);
  }
}

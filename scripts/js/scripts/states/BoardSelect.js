import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { GameState } from "../enums/GameState";
import { GameManager } from "../GameManager";
import { Draw } from "../helpers/Draw";
export class BoardSelect {
    constructor(gameInstance) {
        this.buttonGroup = new ButtonGroup();
        this.gameInstance = gameInstance;
    }
    init() {
        this.initButtons();
    }
    draw(ctx, windowSize) {
        this.drawBackground(ctx, windowSize);
        this.buttonGroup.draw(ctx, windowSize);
    }
    drawBackground(ctx, windowSize) {
        Draw.rectangle(ctx, { x: 0, y: 0 }, { width: windowSize.width, height: windowSize.height }, "DarkSlateGrey");
    }
    update(windowSize) {
        this.buttonGroup.update(windowSize);
    }
    initButtons() {
        this.buttonGroup.setButtons([
            new Button("3 x 3", () => {
                GameManager.setBoardSize({ width: 3, height: 3 });
                this.gameInstance.getBoard().init();
                this.gameInstance.setGameState(GameState.GAMEPLAY);
            }),
            new Button("4 x 4", () => {
                GameManager.setBoardSize({ width: 4, height: 4 });
                this.gameInstance.getBoard().init();
                this.gameInstance.setGameState(GameState.GAMEPLAY);
            }),
            new Button("5 x 5", () => {
                GameManager.setBoardSize({ width: 5, height: 5 });
                this.gameInstance.getBoard().init();
                this.gameInstance.setGameState(GameState.GAMEPLAY);
            }),
            new Button("Back", () => {
                this.gameInstance.setGameState(GameState.START);
            }),
        ]);
    }
}
//# sourceMappingURL=BoardSelect.js.map
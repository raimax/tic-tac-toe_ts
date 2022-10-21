import { Button } from "../Button.js";
import { ButtonGroup } from "../ButtonGroup.js";
import { GameState } from "../enums/GameState.js";
import { GameManager } from "../GameManager.js";
import { Draw } from "../helpers/Draw.js";
export class EndMenu {
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
        this.drawWinner(ctx, windowSize);
    }
    drawBackground(ctx, windowSize) {
        Draw.rectangle(ctx, { x: 0, y: 0 }, { width: windowSize.width, height: windowSize.height }, "DarkSlateGrey");
    }
    drawWinner(ctx, windowSize) {
        if (GameManager.getWinner()) {
            Draw.text("Winner", ctx, { x: 50, y: 100 });
            Draw.image(GameManager.getWinner().image, ctx, { x: 50, y: 150 }, { width: 0, height: 200 });
        }
        else {
            Draw.text("Draw", ctx, { x: windowSize.width / 2 - 60, y: 100 });
        }
    }
    update(windowSize) {
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
//# sourceMappingURL=EndMenu.js.map
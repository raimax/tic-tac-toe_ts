import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { GameState } from "../enums/GameState";
import { Draw } from "../helpers/Draw";
export class MainManu {
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
            new Button("Play", () => {
                this.gameInstance.setGameState(GameState.BOARD_SELECT);
            }),
        ]);
    }
}
//# sourceMappingURL=MainMenu.js.map
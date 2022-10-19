import { Button } from "../Button.js";
import { ButtonGroup } from "../ButtonGroup.js";
import { GameState } from "../enums/GameState.js";
import { Draw } from "../helpers/Draw.js";
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
                this.gameInstance.setGameState(GameState.GAMEPLAY);
            })
        ]);
    }
}
//# sourceMappingURL=MainMenu.js.map
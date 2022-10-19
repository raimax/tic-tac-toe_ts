import { Draw } from "../helpers/Draw.js";
export class Map {
    constructor(gameInstance) {
        this.tiles = [];
        this.gameInstance = gameInstance;
    }
    draw(ctx, windowSize) {
        this.drawBackground(ctx, windowSize);
        this.drawTiles(ctx, windowSize);
    }
    update(windowSize) {
        this.updateTiles(windowSize);
    }
    drawBackground(ctx, windowSize) {
        Draw.rectangle(ctx, { x: 0, y: 0 }, { width: windowSize.width, height: windowSize.height }, "DimGray");
    }
    drawTiles(ctx, windowSize) {
        this.tiles.forEach((tile) => {
            tile.draw(ctx, windowSize);
        });
    }
    updateTiles(windowSize) {
        this.tiles.forEach((tile) => {
            tile.update(windowSize);
        });
    }
}
//# sourceMappingURL=Map.js.map
import { Draw } from "../helpers/Draw.js";
import { Tile } from "../Tile.js";
export class Map {
    constructor(gameInstance) {
        this.tiles = [];
        this.gameInstance = gameInstance;
    }
    inti() {
        this.setupTiles(3, 3);
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
    setupTiles(width, height) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.tiles.push(new Tile({ x: j * 160, y: i * 160 }, { x: width * 75, y: height * 75 }));
            }
        }
    }
}
//# sourceMappingURL=Map.js.map
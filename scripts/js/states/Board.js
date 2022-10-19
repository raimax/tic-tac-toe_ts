import { Draw } from "../helpers/Draw.js";
import { Player } from "../models/Player.js";
import { Tile } from "../Tile.js";
export class Board {
    constructor(gameInstance) {
        this.tiles = [];
        this.players = [];
        this.boardSize = { width: 3, height: 3 };
        this.gameInstance = gameInstance;
    }
    init() {
        this.setupTiles(3, 3);
        this.setupPlayers();
    }
    draw(ctx, windowSize) {
        this.drawBackground(ctx, windowSize);
        this.drawTiles(ctx, windowSize);
    }
    update(windowSize) {
        this.updateTiles(windowSize);
        this.checkForGameOver();
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
                this.tiles.push(new Tile({ x: j * 160, y: i * 160 }, { x: width * 75, y: height * 75 }, () => this.passCurrentPlayer()));
            }
        }
    }
    setupPlayers() {
        this.players.push(new Player("O", "images/o.png"));
        this.players.push(new Player("X", "images/x.png"));
        this.currentPlayer = this.players[1];
    }
    makeMove() { }
    passCurrentPlayer() {
        if (this.currentPlayer === this.players[0]) {
            this.currentPlayer = this.players[1];
        }
        else {
            this.currentPlayer = this.players[0];
        }
        return this.currentPlayer;
    }
    getMoveCount() {
        let moves = 0;
        this.tiles.forEach((tile) => {
            if (tile.isTaken())
                moves++;
        });
        return moves;
    }
    checkForGameOver() {
        // check for win
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].isTaken()) {
                const player = this.tiles[i].getPlayer();
                // check vertical lines
                for (let i = 0; i < this.boardSize.width; i++) {
                    if (this.tiles[i].isTaken() &&
                        this.tiles[i + this.boardSize.width].isTaken() &&
                        this.tiles[i + this.boardSize.width * 2].isTaken()) {
                        // check if taken by same player
                        if (this.tiles[i].getPlayer().name ===
                            this.tiles[i + this.boardSize.width].getPlayer().name &&
                            this.tiles[i].getPlayer().name ===
                                this.tiles[i + this.boardSize.width * 2].getPlayer().name) {
                            // player wins
                            console.log(this.tiles[i].getPlayer().name, " wins vetical");
                        }
                    }
                }
                //! fix
                // check horizontal lines
                for (let i = 0; i < this.boardSize.height; i++) {
                    if (this.tiles[i].isTaken() &&
                        this.tiles[i].isTaken() &&
                        this.tiles[i].isTaken()) {
                        // check if taken by same player
                        if (this.tiles[i].getPlayer().name ===
                            this.tiles[i + 1].getPlayer().name &&
                            this.tiles[i].getPlayer().name ===
                                this.tiles[i + 2].getPlayer().name) {
                            // player wins
                            console.log(this.tiles[i].getPlayer().name, " wins horizontal");
                        }
                    }
                }
            }
        }
        // check for draw
        if (this.tiles.length === this.getMoveCount()) {
            console.log("draw");
        }
    }
}
//# sourceMappingURL=Board.js.map
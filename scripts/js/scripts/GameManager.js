export class GameManager {
    static setWinner(player) {
        this.winner = player;
    }
    static getWinner() {
        return this.winner;
    }
    static setBoardSize(size) {
        this.boardSize = size;
    }
    static getBoardSize() {
        return this.boardSize;
    }
}
GameManager.boardSize = { width: 3, height: 3 };
//# sourceMappingURL=GameManager.js.map
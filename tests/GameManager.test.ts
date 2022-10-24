import { GameManager } from "../scripts/GameManager";

test("board size is 5x5", () => {
  GameManager.setBoardSize({ width: 5, height: 5 });

  expect(GameManager.getBoardSize()).toEqual({ width: 5, height: 5 });
});

test("winner is player 1", () => {
  GameManager.setWinner({ name: "player 1", image: null });

  expect(GameManager.getWinner()).toEqual(expect.objectContaining({ name: "player 1" }));
});

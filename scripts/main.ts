import { GameState } from "./enums/GameState.js";
import { Game } from "./Game.js";
import { Input } from "./helpers/Input.js";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

window.onload = () => {
  onWindowResize();
  game.init();
  game.gameLoop();
};

window.onresize = () => {
  onWindowResize();
};

function onWindowResize() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  game.setWindowSize({ width: canvas.width, height: canvas.height });
}

canvas.addEventListener("mousemove", (e) => {
  let cRect = canvas.getBoundingClientRect();
  let canvasX = Math.round(e.clientX - cRect.left);
  let canvasY = Math.round(e.clientY - cRect.top);
  Input.setMousePos({ x: canvasX, y: canvasY });
});

canvas.addEventListener("click", (e) => {
  let cRect = canvas.getBoundingClientRect();
  let canvasX = Math.round(e.clientX - cRect.left);
  let canvasY = Math.round(e.clientY - cRect.top);
  Input.setMouseClickPos({ x: canvasX, y: canvasY });
});

canvas.addEventListener("mouseout", () => {
  Input.setMousePos({ x: -999, y: -999 });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    game.setGameState(GameState.START);
  }
});

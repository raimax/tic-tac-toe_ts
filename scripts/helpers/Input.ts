import { Vector2 } from "../models/Vector2.js";

export class Input {
  private static mousePos: Vector2;
  private static mouseClickPos: Vector2;

  static getMousePos(): Vector2 {
    return this.mousePos;
  }

  static setMousePos(position: Vector2) {
    this.mousePos = position;
  }

  static getMouseClickPos(): Vector2 {
    return this.mouseClickPos;
  }

  static setMouseClickPos(position: Vector2) {
    this.mouseClickPos = position;
  }
}

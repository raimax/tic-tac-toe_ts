import { Draw } from "./helpers/Draw.js";
import { Input } from "./helpers/Input.js";
import { Player } from "./models/Player.js";
import { Rectangle } from "./models/Rectangle.js";
import { Vector2 } from "./models/Vector2.js";

export class Tile {
  private id;
  private coordinates: Vector2;
  private position: Vector2;
  private size: Rectangle = { width: 150, height: 150 };
  private offset: Vector2;
  private isTakenByPlayer: Player | null = null;
  private command: Function;

  constructor(
    id: number,
    coordinates: Vector2,
    position: Vector2,
    offset: Vector2,
    command: Function
  ) {
    this.id = id;
    this.coordinates = coordinates;
    this.position = position;
    this.offset = offset;
    this.command = command;
  }

  draw(ctx: CanvasRenderingContext2D, windowSize: Rectangle) {
    Draw.rectangle(
      ctx,
      {
        x: this.position.x + windowSize.width / 2 - this.offset.x,
        y: this.position.y + windowSize.height / 2 - this.offset.y,
      },
      this.size,
      "white"
    );

    if (this.isTakenByPlayer) {
      Draw.image(
        this.isTakenByPlayer.image,
        ctx,
        {
          x: this.position.x + windowSize.width / 2 - this.offset.x,
          y: this.position.y + windowSize.height / 2 - this.offset.y,
        },
        this.size
      );
    }
  }

  update(windowSize: Rectangle) {
    if (this.isBeingClicked(windowSize)) {
      if (this.isTakenByPlayer === null) {
        this.isTakenByPlayer = this.command(this);
      }
      Input.resetClickPos();
    }
  }

  isBeingHovered(windowSize: Rectangle): boolean {
    if (
      Input.getMousePos().x >=
        this.position.x + windowSize.width / 2 - this.offset.x &&
      Input.getMousePos().x <=
        this.position.x +
          windowSize.width / 2 +
          this.size.width -
          this.offset.x &&
      Input.getMousePos().y >=
        this.position.y + windowSize.height / 2 - this.offset.y &&
      Input.getMousePos().y <=
        this.position.y +
          windowSize.height / 2 +
          this.size.height -
          this.offset.y
    ) {
      return true;
    }
    return false;
  }

  isBeingClicked(windowSize: Rectangle): boolean {
    if (
      Input.getMouseClickPos().x >=
        this.position.x + windowSize.width / 2 - this.offset.x &&
      Input.getMouseClickPos().x <=
        this.position.x +
          windowSize.width / 2 +
          this.size.width -
          this.offset.x &&
      Input.getMouseClickPos().y >=
        this.position.y + windowSize.height / 2 - this.offset.y &&
      Input.getMouseClickPos().y <=
        this.position.y +
          windowSize.height / 2 +
          this.size.height -
          this.offset.y
    ) {
      return true;
    }
    return false;
  }

  isTaken(): boolean {
    return !!this.isTakenByPlayer;
  }

  getPlayer(): Player {
    return this.isTakenByPlayer;
  }

  getId() {
    return this.id;
  }

  getCoordinates() {
    return this.coordinates;
  }
}

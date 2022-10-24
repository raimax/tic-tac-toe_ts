import { Player } from "../scripts/models/Player";
import { Rectangle } from "../scripts/models/Rectangle";
import { Vector2 } from "../scripts/models/Vector2";
import { Tile } from "../scripts/Tile";

let tiles: Tile[] = [];

function setupTiles(boradSize: Rectangle) {
  tiles = [];
  let id = 1;
  for (let i = 0; i < boradSize.height; i++) {
    for (let j = 0; j < boradSize.width; j++) {
      tiles.push(
        new Tile(
          id,
          { x: i, y: j },
          { x: j * 160, y: i * 160 },
          { x: boradSize.width * 75, y: boradSize.height * 75 },
          () => {}
        )
      );
      id++;
    }
  }
}

function isHorizontal(tile: Tile, coordinates: Vector2): boolean {
  if (tile.getCoordinates().x === coordinates.x) return true;
  return false;
}

function isOutOfBoundsVerticalLeft(tiles: Tile[], i: number): boolean {
  if (0 > i - 1) {
    return true;
  }
  return false;
}

function isOutOfBoundsVerticalRight(tiles: Tile[], i: number): boolean {
  if (tiles.length <= i + 1) {
    return true;
  }
  return false;
}

beforeEach(() => {
  setupTiles({ width: 3, height: 3 });
});

test("move count is 0", () => {
  function getMoveCount(): number {
    let moves: number = 0;
    tiles.forEach((tile: Tile) => {
      if (tile.isTaken()) moves++;
    });
    return moves;
  }

  expect(getMoveCount()).toBe(0);
});

test("move count is 9", () => {
  function getMoveCount(): number {
    let moves: number = 0;
    tiles.forEach((tile: Tile) => {
      tile.setPlayer({ name: "", image: null });
      if (tile.isTaken()) moves++;
    });
    return moves;
  }

  expect(getMoveCount()).toBe(9);
});

test("left tile has id of 1", () => {
  function getLeftTile(tiles: Tile[], i: number, player: Player): Tile | null {
    //check if not out of bounds
    if (!isOutOfBoundsVerticalLeft(tiles, i)) {
      //check if horizontal
      if (isHorizontal(tiles[i - 1], tiles[i].getCoordinates())) {
        //check if from same player
        if (tiles[i - 1].getPlayer()?.name === player.name) {
          return tiles[i - 1];
        }
      }
    }
    return null;
  }

  expect(getLeftTile(tiles, 1, { name: undefined, image: null })).toEqual(
    expect.objectContaining({ id: 1 })
  );
});

test("left tile is is null", () => {
  function getLeftTile(tiles: Tile[], i: number, player: Player): Tile | null {
    //check if not out of bounds
    if (!isOutOfBoundsVerticalLeft(tiles, i)) {
      //check if horizontal
      if (isHorizontal(tiles[i - 1], tiles[i].getCoordinates())) {
        //check if from same player
        if (tiles[i - 1].getPlayer()?.name === player.name) {
          return tiles[i - 1];
        }
      }
    }
    return null;
  }

  expect(getLeftTile(tiles, 0, { name: undefined, image: null })).toBeNull();
});

test("tile to the right is out of bounds", () => {
  function isOutOfBoundsVerticalRight(tiles: Tile[], i: number): boolean {
    if (tiles.length <= i + 1) {
      return true;
    }
    return false;
  }

  expect(isOutOfBoundsVerticalRight(tiles, 8)).toBeTruthy();
});

test("top tile has id of 1", () => {
  function getTopTile(tiles: Tile[], i: number, player: Player): Tile | null {
    //check if not out of bounds
    if (!isOutOfBoundsVerticalLeft(tiles, i)) {
      for (let j = i - 1; j >= 0; j--) {
        //check if vertical
        if (tiles[j].getCoordinates().y === tiles[i].getCoordinates().y) {
          //check if from same player
          if (tiles[j].getPlayer()?.name === player.name) {
            return tiles[j];
          }
        }
      }
    }
    return null;
  }

  expect(getTopTile(tiles, 3, { name: undefined, image: null })).toEqual(
    expect.objectContaining({ id: 1 })
  );
});

test("bottom tile has id of 4", () => {
  function getBottomTile(
    tiles: Tile[],
    i: number,
    player: Player
  ): Tile | null {
    //check if not out of bounds
    if (!isOutOfBoundsVerticalRight(tiles, i)) {
      for (let j = i + 1; j < tiles.length; j++) {
        //check if vertical
        if (tiles[j].getCoordinates().y === tiles[i].getCoordinates().y) {
          //check if from same player
          if (tiles[j].getPlayer()?.name === player.name) {
            return tiles[j];
          }
        }
      }
    }
    return null;
  }

  expect(getBottomTile(tiles, 0, { name: undefined, image: null })).toEqual(
    expect.objectContaining({ id: 4 })
  );
});

test("right tile has id of 2", () => {
  function getRightTile(tiles: Tile[], i: number, player: Player): Tile | null {
    //check if not out of bounds
    if (!isOutOfBoundsVerticalRight(tiles, i)) {
      //check if horizontal
      if (isHorizontal(tiles[i + 1], tiles[i].getCoordinates())) {
        //check if from same player
        if (tiles[i + 1].getPlayer()?.name === player.name) {
          return tiles[i + 1];
        }
      }
    }
    return null;
  }

  expect(getRightTile(tiles, 0, { name: undefined, image: null })).toEqual(
    expect.objectContaining({ id: 2 })
  );
});

import { Dir, readFileSync } from "fs";
import { join } from "path";

enum Direction {
  North = 0,
  South = 180,
  East = 90,
  West = 270,
}

enum Action {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
  Left = "L",
  Right = "R",
  Forward = "F",
}

interface IInstruction {
  action: Action;
  value: number;
}

interface IShip {
  direction: Direction;
  x: number;
  y: number;
}

const ship: IShip = {
  direction: Direction.East,
  x: 0,
  y: 0,
};

const generateInstruction = (input: string): IInstruction => {
  const match = /(N|S|E|W|L|R|F)(\d*)/.exec(input);

  return {
    action: match[1] as Action,
    value: +match[2],
  };
};

const forward = (value: number) => {
  switch (ship.direction) {
    case Direction.North:
      ship.y += value;
      break;
    case Direction.South:
      ship.y -= value;
      break;
    case Direction.East:
      ship.x += value;
      break;
    case Direction.West:
      ship.x -= value;
      break;
  }
};

const executeInstruction = (instruction: IInstruction) => {
  switch (instruction.action) {
    case Action.North:
      ship.y += instruction.value;
      break;
    case Action.South:
      ship.y -= instruction.value;
      break;
    case Action.East:
      ship.x += instruction.value;
      break;
    case Action.West:
      ship.x -= instruction.value;
      break;
    case Action.Right:
      ship.direction = (ship.direction + instruction.value) % 360;
      break;
    case Action.Left:
      ship.direction =
        (ship.direction - instruction.value < 0 ? 360 : 0) +
        (ship.direction - instruction.value);
      break;
    case Action.Forward:
      forward(instruction.value);
      break;
  }
};

const instructions = readFileSync(join(__dirname, "input.txt"), "utf-8")
  .split("\r\n")
  .map(generateInstruction);

for (const instruction of instructions) {
  executeInstruction(instruction);
}

export const result = Math.abs(ship.x) + Math.abs(ship.y);

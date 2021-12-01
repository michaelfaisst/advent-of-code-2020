import { readFileSync } from "fs";
import { join } from "path";

interface ILayout {
  [row: number]: ILayoutRow;
}

interface IPosition {
  isSeat: boolean;
  isOccupied: boolean;
}

interface ILayoutRow {
  [col: number]: IPosition;
}

const mapRowToPositions = (row: string): ILayoutRow => {
  return row.split("").reduce<ILayoutRow>((acc, value, i) => {
    acc[i] = {
      isSeat: value != ".",
      isOccupied: value == "#",
    };
    return acc;
  }, {});
};

const getNeighbour = (
  seatMap: ILayout,
  row: number,
  col: number,
  deltaRow: number,
  deltaCol: number
) => {
  while (true) {
    row += deltaRow;
    col += deltaCol;

    if (!seatMap[row] || !seatMap[col]) return undefined;

    if (!seatMap[row][col].isSeat) {
      continue;
    }

    return seatMap[row][col];
  }
};

const getNeighbours = (
  seatMap: ILayout,
  row: number,
  col: number
): IPosition[] => {
  return [
    getNeighbour(seatMap, row, col, -1, -1),
    getNeighbour(seatMap, row, col, -1, 0),
    getNeighbour(seatMap, row, col, -1, 1),
    getNeighbour(seatMap, row, col, 0, -1),
    getNeighbour(seatMap, row, col, 0, 1),
    getNeighbour(seatMap, row, col, 1, -1),
    getNeighbour(seatMap, row, col, 1, 0),
    getNeighbour(seatMap, row, col, 1, 1),
  ].filter((x) => x != null);
};

const checkRules = (
  seatMap: ILayout,
  newSeatMap: ILayout,
  row: number,
  col: number
): void => {
  const pos = newSeatMap[row][col];

  if (!pos.isSeat) {
    return;
  }

  if (
    pos.isOccupied &&
    getNeighbours(seatMap, row, col).filter((x) => x.isOccupied).length >= 5
  ) {
    pos.isOccupied = false;
    return;
  }

  if (
    !pos.isOccupied &&
    getNeighbours(seatMap, row, col).every((x) => !x.isOccupied)
  ) {
    pos.isOccupied = true;
    return;
  }
};

const runIteration = (seatMap: ILayout): ILayout => {
  const newSeatMap = JSON.parse(JSON.stringify(seatMap)) as ILayout;
  for (let row in seatMap) {
    for (let col in seatMap[row]) {
      checkRules(seatMap, newSeatMap, +row, +col);
    }
  }

  return newSeatMap;
};

const countOccupiedSeats = (seatMap: ILayout) => {
  return Object.values(seatMap)
    .map((row: ILayoutRow) => Object.values(row))
    .flatMap((value) => value)
    .filter((x: IPosition) => x.isSeat && x.isOccupied).length;
};

const areLayoutsEqual = (seatMap1: ILayout, seatMap2: ILayout) => {
  for (const row in seatMap1) {
    for (const col in seatMap1) {
      if (seatMap1[row][col].isOccupied !== seatMap2[row][col].isOccupied) {
        return false;
      }
    }
  }

  return true;
};

const input = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\r\n");

let seatMap = input.reduce<ILayout>((acc, row, i) => {
  acc[i] = mapRowToPositions(row);
  return acc;
}, {});

while (true) {
  const newSeatMap = runIteration(seatMap);

  if (areLayoutsEqual(seatMap, newSeatMap)) {
    break;
  }

  seatMap = newSeatMap;
}

export const result = countOccupiedSeats(seatMap);

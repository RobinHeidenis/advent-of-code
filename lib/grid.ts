export type Coordinate = { x: number; y: number };

export const makeCoordinateKey = (coordinate: Coordinate) => {
  return `${coordinate.x},${coordinate.y}`;
};

export class Grid {
  private grid: boolean[][] = [];

  public getGrid() {
    return this.grid;
  }

  public setGrid(grid: boolean[][]) {
    this.grid = grid;
  }

  public import(input: string[]) {
    this.grid = input.map((line) => line.split("").map((c) => c === "#"));
  }

  public get({ x, y }: Coordinate) {
    return this.grid[y]?.[x];
  }

  public set({ x, y }: Coordinate, value: boolean) {
    if (!this.grid[y]) {
      this.grid[y] = [];
    }

    this.grid[y][x] = value;
  }

  public setBulk(coordinates: Coordinate[], value: boolean) {
    coordinates.forEach((coordinate) => {
      this.set(coordinate, value);
    });
  }

  public getSurrounding({ x, y }: Coordinate) {
    return [
      this.get({ x: x - 1, y: y - 1 }),
      this.get({ x, y: y - 1 }),
      this.get({ x: x + 1, y: y - 1 }),
      this.get({ x: x + 1, y }),
      this.get({ x: x + 1, y: y + 1 }),
      this.get({ x, y: y + 1 }),
      this.get({ x: x - 1, y: y + 1 }),
      this.get({ x: x - 1, y }),
    ];
  }

  public copy() {
    const newGrid = new Grid();
    newGrid.setGrid(this.grid.map((row) => row.slice()));
    return newGrid;
  }

  public getYLength() {
    return this.grid.length;
  }

  public getXLength() {
    return this.grid[0].length;
  }

  toString() {
    return this.grid
      .map((row) => row.map((c) => (c ? "#" : ".")).join(""))
      .join("\n");
  }
}

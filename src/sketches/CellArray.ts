export type Directions = "up" | "down" | "left" | "right";

export class CellArray {
  constructor(private cells: number[], public size: number) {}

  get(row: number, col: number): number {
    return this.cells[row * this.size + col];
  }

  add(other: number | CellArray): CellArray {
    if (typeof other === "number") {
      return this.map((c) => c + other);
    } else {
      if (this.cells.length !== other.cells.length) {
        throw new Error("Invalid length of array");
      }

      const results: number[] = [];
      for (let i = 0; i < this.cells.length; i++) {
        results.push(this.cells[i] + other.cells[i]);
      }

      return new CellArray(results, this.size);
    }
  }

  sub(other: number | CellArray): CellArray {
    if (typeof other === "number") {
      return this.map((c) => c - other);
    } else {
      if (this.cells.length !== other.cells.length) {
        throw new Error("Invalid length of array");
      }

      const results: number[] = [];
      for (let i = 0; i < this.cells.length; i++) {
        results.push(this.cells[i] - other.cells[i]);
      }

      return new CellArray(results, this.size);
    }
  }

  mul(multiplier: number | CellArray): CellArray {
    if (typeof multiplier === "number") {
      return new CellArray(
        this.cells.map((c) => c * multiplier),
        this.size
      );
    } else {
      const results: number[] = [];
      for (let i = 0; i < this.cells.length; i++) {
        results.push(this.cells[i] * multiplier.cells[i]);
      }
      return new CellArray(results, this.size);
    }
  }

  div(divider: number | CellArray): CellArray {
    if (typeof divider === "number") {
      return new CellArray(
        this.cells.map((c) => c / divider),
        this.size
      );
    } else {
      const results: number[] = [];
      for (let i = 0; i < this.cells.length; i++) {
        results.push(this.cells[i] / divider.cells[i]);
      }
      return new CellArray(results, this.size);
    }
  }

  roll(direction: Directions): CellArray {
    const results: number[] = [];

    switch (direction) {
      case "up": {
        for (let row = 1; row < this.size; row++) {
          for (let col = 0; col < this.size; col++) {
            results.push(this.cells[row * this.size + col]);
          }
        }
        for (let firstCol = 0; firstCol < this.size; firstCol++) {
          results.push(this.cells[firstCol]);
        }
        return new CellArray(results, this.size);
      }

      case "down": {
        for (let lastCol = 0; lastCol < this.size; lastCol++) {
          results.push(this.cells[this.size * (this.size - 1) + lastCol]);
        }
        for (let row = 0; row < this.size - 1; row++) {
          for (let col = 0; col < this.size; col++) {
            results.push(this.cells[row * this.size + col]);
          }
        }
        return new CellArray(results, this.size);
      }

      case "left": {
        for (let row = 0; row < this.size; row++) {
          for (let col = 1; col < this.size; col++) {
            results.push(this.cells[row * this.size + col]);
          }
          results.push(this.cells[row * this.size]);
        }
        return new CellArray(results, this.size);
      }

      case "right": {
        for (let row = 0; row < this.size; row++) {
          results.push(this.cells[row * this.size + this.size - 1]);
          for (let col = 0; col < this.size - 1; col++) {
            results.push(this.cells[row * this.size + col]);
          }
        }
        return new CellArray(results, this.size);
      }
    }
  }

  forEach(callback: (cell: number, row: number, col: number) => void): void {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        callback(this.cells[row * this.size + col], row, col);
      }
    }
  }

  map(callback: (cell: number, row: number, col: number) => number): CellArray {
    const newCells = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        newCells.push(callback(this.cells[row * this.size + col], row, col));
      }
    }
    return new CellArray(newCells, this.size);
  }
}

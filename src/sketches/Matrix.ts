export type MatrixIndex = [number, number]; // [row, col]

export class Matrix {
  public readonly rows: number;
  public readonly cols: number;
  constructor(private nums: number[][]) {
    this.rows = nums.length;
    this.cols = nums[0].length;
  }

  static fromFill(num: number, rows: number, cols: number): Matrix {
    return new Matrix([...Array(rows)].map(() => [...Array(cols)].fill(num)));
  }

  static zeros(rows: number, cols: number): Matrix {
    return Matrix.fromFill(0, rows, cols);
  }

  static identity(rows: number, cols: number): Matrix {
    return new Matrix(
      [...Array(rows)].map((_, i) =>
        [...Array(cols)].map((_, j) => (i === j ? 1 : 0))
      )
    );
  }

  map(callback: (num: number, index: MatrixIndex) => number): Matrix {
    return new Matrix(
      this.nums.map((row, i) => row.map((v, j) => callback(v, [i, j])))
    );
  }

  forEach(callback: (num: number, index: MatrixIndex) => void): void {
    this.nums.forEach((row, i) => row.forEach((v, j) => callback(v, [i, j])));
  }

  get(index: MatrixIndex): number {
    return this.nums[index[0]][index[1]];
  }

  getRow(index: number): number[] {
    return this.nums[index];
  }

  getCol(index: number): number[] {
    return this.transpose().nums[index];
  }

  transpose(): Matrix {
    const m = [...Array(this.cols)].map(() => [...Array(this.rows)]);
    this.forEach((n, [row, col]) => {
      m[col][row] = n;
    });

    return new Matrix(m);
  }

  /**
   * 1 2                      1  2  3  4
   * 3 4 MULTIPLIES 1 2 3 4 = 5  6  7  8
   * 5 6            5 6 7 8   9 10 11 12
   */
  mul(m: Matrix): Matrix {
    if (this.cols !== m.rows) {
      throw new Error(
        `Can't multiply matrix(${this.rows},${this.cols}) * matrix(${m.rows},${
          m.cols
        })`
      );
    }

    return Matrix.zeros(this.rows, m.cols).map(
      (_, [row, col]) => this.matrixMulRowCols(this.getRow(row), m.getCol(col))
    );
  }

  private matrixMulRowCols(row: number[], col: number[]): number {
    if (row.length !== col.length) {
      throw new Error(`Can't multiply row and col because of length is different. (rows:${row.length}, col:${col.length})`);
    }
    return row.map((n, i) => n * col[i]).reduce((a, n) => a + n, 0);
  }
}

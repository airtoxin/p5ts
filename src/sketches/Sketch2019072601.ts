import {Sketch} from "../Sketch";
import {Matrix} from "./Matrix";

export class Sketch2019072601 extends Sketch {
  protected SIZE: number = 500;
  private ROWS = 20;
  private COLS = 4;
  private SCALAR = this.SIZE / (this.ROWS + this.COLS);

  setup() {
    super.setup();
    this.p5.noLoop();
  }

  draw() {
    super.draw();

    const matrixA = Matrix.identity(this.ROWS, this.COLS);
    const matrixB = new Matrix([[0, 1, 0, 0],[1, 0, 1, 1],[1, 1, 0, 0],[0, 0, 0, 1]]);
    const matrixC = Matrix.identity(this.COLS, this.ROWS);
    const matrixP = matrixA.mul(matrixB.transpose()).mul(matrixC);

    this.drawTable(matrixA, 0, this.COLS, this.p5.color("black"), this.p5.color("white"));
    this.drawTable(matrixB, 0, 0, this.p5.color("black"), this.p5.color("white"));
    this.drawTable(matrixC, this.COLS, 0, this.p5.color("black"), this.p5.color("white"));
    this.drawTable(matrixP, this.COLS, this.COLS, this.p5.color(198, 50, 79), this.p5.color(101, 182, 163));

    this.p5.strokeWeight(3);
    this.p5.line(0, this.SCALAR * this.COLS, this.SIZE, this.SCALAR * this.COLS);
    this.p5.line(this.SCALAR * this.COLS, 0, this.SCALAR * this.COLS, this.SIZE);
  }

  private drawTable(matrix: Matrix, xOffset: number, yOffset: number, c1: p5.Color, c2: p5.Color) {
    matrix.forEach((num, [row, col]) => {
      const posX = (xOffset + col) * this.SCALAR;
      const posY = (yOffset + row) * this.SCALAR;

      this.p5.fill(num === 0 ? c2 : c1);
      this.p5.rect(posX, posY, this.SCALAR, this.SCALAR);
    });
  }
}

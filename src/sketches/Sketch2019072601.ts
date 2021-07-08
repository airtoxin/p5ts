import { Sketch } from "../Sketch";
import { Matrix } from "./Matrix";
import { Color } from "p5";

export class Sketch2019072601 extends Sketch {
  protected SIZE: number = 500;
  private ROWS = 20;
  private COLS = 4;
  private SCALAR = this.SIZE / (this.ROWS + this.COLS);

  private matrixA = Matrix.fromFill(this.ROWS, this.COLS, () =>
    Math.floor(Math.random() * 2)
  );
  private matrixB = Matrix.fromFill(this.COLS, this.COLS, () =>
    Math.floor(Math.random() * 2)
  );
  private matrixC = Matrix.fromFill(this.COLS, this.ROWS, () =>
    Math.floor(Math.random() * 2)
  );
  private get matrixP() {
    return this.matrixA.mul(this.matrixB.transpose()).mul(this.matrixC);
  }

  onClick(mouseX: number, mouseY: number): void {
    const x = Math.floor(mouseX / this.SCALAR);
    const y = Math.floor(mouseY / this.SCALAR);
    if (y < this.COLS) {
      if (x < this.COLS) {
        this.matrixB = this.matrixB.set([y, x], (n) => (n + 1) % 2);
      } else {
        this.matrixC = this.matrixC.set([y, x - this.COLS], (n) => (n + 1) % 2);
      }
    } else if (x < this.COLS) {
      this.matrixA = this.matrixA.set([y - this.COLS, x], (n) => (n + 1) % 2);
    }
  }

  draw() {
    super.draw();

    this.p5.strokeWeight(1);

    this.drawTable(
      this.matrixA,
      0,
      this.COLS,
      this.p5.color("black"),
      this.p5.color("white")
    );
    this.drawTable(
      this.matrixB,
      0,
      0,
      this.p5.color("black"),
      this.p5.color("white")
    );
    this.drawTable(
      this.matrixC,
      this.COLS,
      0,
      this.p5.color("black"),
      this.p5.color("white")
    );
    this.drawTable(
      this.matrixP,
      this.COLS,
      this.COLS,
      this.p5.color(198, 50, 79),
      this.p5.color(101, 182, 163)
    );

    this.p5.strokeWeight(3);
    this.p5.line(
      0,
      this.SCALAR * this.COLS,
      this.SIZE,
      this.SCALAR * this.COLS
    );
    this.p5.line(
      this.SCALAR * this.COLS,
      0,
      this.SCALAR * this.COLS,
      this.SIZE
    );
  }

  private drawTable(
    matrix: Matrix,
    xOffset: number,
    yOffset: number,
    c1: Color,
    c2: Color
  ) {
    matrix.forEach((num, [row, col]) => {
      const posX = (xOffset + col) * this.SCALAR;
      const posY = (yOffset + row) * this.SCALAR;

      this.p5.fill(num === 0 ? c2 : c1);
      this.p5.rect(posX, posY, this.SCALAR, this.SCALAR);
    });
  }
}

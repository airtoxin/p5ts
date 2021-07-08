import "p5";
import { Sketch } from "../Sketch";
import { Matrix } from "./Matrix";

export class Sketch2021070901 extends Sketch {
  protected SIZE: number = 500;
  private linePoints = Array.from(Array(10)).map(() => this.random());

  draw() {
    super.draw();

    this.drawLines();
  }

  private drawLines() {
    this.p5.push();

    this.p5.noFill();

    for (let i = 0; i < this.linePoints.length; i++) {
      this.p5.curve(
        this.linePoints[i],
        this.linePoints[(i + 1) % this.linePoints.length],
        this.linePoints[(i + 2) % this.linePoints.length],
        this.linePoints[(i + 3) % this.linePoints.length],
        this.linePoints[(i + 4) % this.linePoints.length],
        this.linePoints[(i + 5) % this.linePoints.length],
        this.linePoints[(i + 6) % this.linePoints.length],
        this.linePoints[(i + 7) % this.linePoints.length]
      );
    }

    this.p5.pop();
  }

  private random() {
    return Math.random() * this.SIZE;
  }
}

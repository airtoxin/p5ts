import "p5";
import { Sketch } from "../Sketch";
import { Matrix } from "./Matrix";

export class Sketch2021070902 extends Sketch {
  protected SIZE: number = 500;
  private linePoints = Array.from(Array(10)).map(() => this.random());

  draw() {
    super.draw();

    this.drawLines();
  }

  private drawLines() {
    this.p5.push();

    this.p5.noFill();

    for (let j = 0; j < 24; j++) {
      this.p5.translate(this.SIZE / 2, this.SIZE / 2);
      this.p5.scale(0.4);
      this.p5.rotate(((this.p5.PI * 2) / 24) * j);

      this.p5.beginShape();
      for (let i = 0; i < this.linePoints.length + 4; i++) {
        this.p5.curveVertex(
          this.linePoints[i % this.linePoints.length],
          this.linePoints[(i + 1) % this.linePoints.length]
        );
      }
      this.p5.endShape();
      this.p5.resetMatrix();
    }

    this.p5.pop();
  }

  private random() {
    return Math.random() * this.SIZE;
  }
}

import "p5";
import { Sketch } from "../Sketch";
import { Matrix } from "./Matrix";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2021070904 extends Sketch {
  protected SIZE: number = 300;
  protected FRAME_RATE: number = 60;

  private NUM_CLONES = 24;
  private linePoints = Array.from(Array(10)).map(() => this.random());

  setup() {
    super.setup();
    this.p5.background("aliceblue");
  }

  draw() {
    // if (this.p5.frameCount === 1) {
    //   this.startCapture();
    // }

    this.p5.background("aliceblue");
    super.draw();

    this.drawLines();

    // this.capture();
    //
    // if (this.p5.frameCount >= 720) {
    //   this.stopCapture();
    // }
  }

  private drawLines() {
    this.p5.push();

    this.p5.noFill();
    this.p5.strokeWeight(2);

    for (let j = 0; j < this.NUM_CLONES; j++) {
      this.p5.translate(this.SIZE / 2, this.SIZE / 2);
      this.p5.translate(
        (cyclic(this.p5.frameCount / 2, Math.cos) * this.SIZE) / 10,
        (cyclic(this.p5.frameCount / 2, Math.sin) * this.SIZE) / 10
      );

      this.p5.scale(0.4);
      this.p5.rotate(((this.p5.PI * 2) / this.NUM_CLONES) * j);
      this.p5.translate(
        cyclic(this.p5.frameCount / 2, Math.cos) * (this.SIZE / 2) -
          this.SIZE / 2,
        0
      );

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

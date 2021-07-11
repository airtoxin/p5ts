import { Sketch } from "../Sketch";
import { Vector } from "p5";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2021071104 extends Sketch {
  protected SIZE: number = 500;
  protected FRAME_RATE: number = 60;

  setup() {
    super.setup();
    this.p5.pixelDensity(1);
    this.p5.background("black");
    this.p5.stroke(255, 255, 255);
    this.p5.fill("black");
  }

  private prevVectors: Vector[] = [];
  draw() {
    this.p5.background(0, 0, 0, 50);

    this.p5.translate(this.SIZE / 2, this.SIZE / 2);

    const i = this.p5.frameCount * 10;
    for (let b = 0; b < this.SIZE / 2; b += 10) {
      const a = this.SIZE / 4;
      const rad = degToRad(i);
      const x = (a - b) * Math.cos(rad) + b * Math.cos(((a - b) / b) * rad);
      const y = (a - b) * Math.sin(rad) - b * Math.sin(((a - b) / b) * rad);

      const vector = this.p5.createVector(x, y);
      if (this.prevVectors[b] != null) {
        this.p5.line(this.prevVectors[b].x, this.prevVectors[b].y, x, y);
      }
      this.prevVectors[b] = vector;
    }

    this.p5.resetMatrix();
  }
}

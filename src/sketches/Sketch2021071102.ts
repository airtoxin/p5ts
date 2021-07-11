import "p5";
import { Sketch } from "../Sketch";
import { Matrix } from "./Matrix";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2021071102 extends Sketch {
  protected SIZE: number = 500;
  protected FRAME_RATE: number = 60;

  setup() {
    super.setup();
    this.p5.background("black");
    this.p5.stroke(255, 255, 255, 50);
    this.p5.fill("black");
    this.p5.noLoop();
  }

  draw() {
    this.p5.translate(0, this.SIZE / 2);

    for (let i = 0; i < 360 * 10; i += 0.1) {
      for (let dist = 0; dist < this.SIZE / 2; dist += 10) {
        const size = this.SIZE / 4;
        const rad = degToRad(i);
        const x = (size * rad - dist * Math.sin(rad)) % this.SIZE;
        const y = size - dist * Math.cos(rad);

        this.p5.point(x, y);

        this.p5.resetMatrix();
      }
    }
  }
}

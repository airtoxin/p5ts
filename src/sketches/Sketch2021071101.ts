import "p5";
import { Sketch } from "../Sketch";
import { Matrix } from "./Matrix";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2021071101 extends Sketch {
  protected SIZE: number = 300;
  protected FRAME_RATE: number = 60;

  setup() {
    super.setup();
    this.p5.background("black");
    this.p5.stroke("white");
    this.p5.fill("black");
    this.p5.noLoop();
  }

  draw() {
    this.p5.translate(0, this.SIZE / 2);

    for (let i = 0; i < 360 * 10; i += 0.1) {
      const r = this.SIZE / 2;
      const rad = degToRad(i);
      const x = (r * (rad - Math.sin(rad))) % this.SIZE;
      const y = r * (1 - Math.cos(rad));

      this.p5.circle(x, y, 1);

      this.p5.resetMatrix();
    }
  }
}

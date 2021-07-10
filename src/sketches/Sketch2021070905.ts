import "p5";
import { Sketch } from "../Sketch";
import { Matrix } from "./Matrix";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2021070905 extends Sketch {
  protected SIZE: number = 300;
  protected FRAME_RATE: number = 60;

  setup() {
    super.setup();
    this.p5.background("aliceblue");
  }

  draw() {
    this.p5.background("aliceblue");

    this.p5.translate(this.SIZE / 2, this.SIZE / 2);
    this.p5.rotate(degToRad(this.p5.frameCount));

    const NUM_POINTS = 20;
    const points = Array.from(Array(NUM_POINTS)).map(
      (_, i) => ((i / NUM_POINTS) * this.SIZE) / 2
    );
    for (const point of points) {
      this.p5.circle(point, 0, 3);
    }

    this.p5.resetMatrix();
  }
}

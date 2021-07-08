import { Sketch } from "../Sketch";
import { sampleSize } from "lodash";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2018080301 extends Sketch {
  setup() {
    super.setup();

    this.p5.noLoop();
    this.p5.stroke(255);
  }

  draw() {
    this.p5.background(0);

    for (let y = 0; y < this.SIZE; y += 5) {
      for (let x = 0; x < this.SIZE; x += 5) {
        const points = [
          [x, y],
          [x, y + 5],
          [x + 5, y],
          [x + 5, y + 5],
        ];
        const [[x1, y1], [x2, y2]] = sampleSize(points, 2);
        this.p5.line(x1, y1, x2, y2);
      }
    }
  }
}

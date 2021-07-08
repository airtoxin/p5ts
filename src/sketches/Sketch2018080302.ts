import { Sketch } from "../Sketch";
import { sampleSize } from "lodash";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));
const percentage = (min: number, max: number, num: number): number =>
  (num - min) / (max - min);

export class Sketch2018080302 extends Sketch {
  setup() {
    super.setup();

    this.p5.noLoop();
    this.p5.stroke(255);
    this.p5.colorMode(this.p5.HSB);
  }

  draw() {
    this.p5.background(0);

    const rectSize = 5;

    for (let y = 0; y < this.SIZE; y += rectSize) {
      for (let x = 0; x < this.SIZE; x += rectSize) {
        const color = this.p5.lerpColor(
          this.p5.color(150, 100, 100),
          this.p5.color(220, 100, 100),
          percentage(0, this.SIZE * 2, x + y)
        );
        this.p5.stroke(color);

        const points = [
          [x, y],
          [x, y + rectSize],
          [x + rectSize, y],
          [x + rectSize, y + rectSize],
        ];
        const [[x1, y1], [x2, y2]] = sampleSize(points, 2);
        this.p5.line(x1, y1, x2, y2);
      }
    }
  }
}

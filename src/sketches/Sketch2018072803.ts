import { Sketch } from "../Sketch";

const NUM_LINES = 100;
const PADDING = 100;

export class Sketch2018072803 extends Sketch {
  draw() {
    this.p5.background(100);
    this.p5.stroke(255);

    for (let i = 0; i < NUM_LINES; i++) {
      const x = (this.SIZE / NUM_LINES) * (i + 1);
      const offset =
        (Math.sin((((Math.PI * 2) / NUM_LINES) * this.p5.frameCount) / 3) *
          this.SIZE) /
          2 +
        this.SIZE / 2;
      this.p5.line(x + offset, PADDING, x, this.SIZE - PADDING);
    }

    for (let i = 0; i < NUM_LINES; i++) {
      const y = (this.SIZE / NUM_LINES) * (i + 1);
      const offset =
        (Math.sin((((Math.PI * 2) / NUM_LINES) * this.p5.frameCount) / 3) *
          this.SIZE) /
          2 +
        this.SIZE / 2;
      this.p5.line(PADDING, y + offset, this.SIZE - PADDING, y);
    }
  }
}

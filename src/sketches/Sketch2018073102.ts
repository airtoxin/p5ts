import { Sketch } from "../Sketch";

const NUM_LINES = 100;
const PADDING = 0;

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2018073102 extends Sketch {
  protected SIZE: number = 200;
  protected FRAME_RATE: number = 30;

  setup() {
    super.setup();

    this.startCapture();
  }

  draw() {
    super.draw();

    this.p5.background(100);
    this.p5.stroke(255);

    for (let i = 0; i < NUM_LINES; i++) {
      const x = (this.SIZE / NUM_LINES) * (i + 1);
      const offset = Math.abs(cyclic(this.p5.frameCount)) * this.SIZE;
      this.p5.line(x + offset, PADDING, x, this.SIZE - PADDING);
    }

    for (let i = 0; i < NUM_LINES; i++) {
      const y = (this.SIZE / NUM_LINES) * (i + 1);
      const offset = Math.abs(cyclic(this.p5.frameCount)) * this.SIZE;
      this.p5.line(PADDING, y + offset, this.SIZE - PADDING, y);
    }

    this.capture();

    if (this.p5.frameCount >= 180) {
      this.stopCapture();
    }
  }
}

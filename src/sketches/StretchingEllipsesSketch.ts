import { Sketch } from "../Sketch";

const NUM_DOTS = 100;

const degToRad = (degrees: number) => (Math.PI / 180) * degrees;

export class StretchingEllipsesSketch extends Sketch {
  setup() {
    super.setup();

    this.p5.noStroke();
    this.startCapture();
  }

  draw() {
    this.p5.background(100);
    [...Array(NUM_DOTS)].forEach((_, i) => {
      const x = i * 5;
      const y =
        this.SIZE / 2 +
        (Math.cos(degToRad((this.p5.frameCount * i) / 4)) * this.SIZE) / 2;
      this.p5.ellipse(x, y, 3);
    });

    this.capture();

    if (this.p5.frameCount >= 360 * 4) {
      this.stopCapture();
    }
  }
}

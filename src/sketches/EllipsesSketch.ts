import { Sketch } from "../Sketch";

export class EllipsesSketch extends Sketch {
  private frames: number = 0;

  setup() {
    super.setup();

    this.p5.noStroke();
    this.startCapture();
  }

  draw() {
    this.frames++;

    this.p5.background(100);
    this.p5.ellipse(
      (Math.sin((Math.PI / 2 / 50) * this.frames) * this.SIZE) / 2 +
        this.SIZE / 2,
      this.SIZE / 2,
      50,
      50
    );
    this.capture();

    if (this.frames >= 200) {
      this.stopCapture();
    }
  }
}

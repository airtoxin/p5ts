import { Sketch } from "../Sketch";

export class SampleSketch extends Sketch {
  private frames: number = 0;

  setup() {
    super.setup();

    this.startCapture();
  }

  draw() {
    this.frames++;

    this.p5.background(100);
    this.p5.ellipse(
      Math.random() * this.SIZE,
      Math.random() * this.SIZE,
      Math.random() * this.SIZE
    );

    this.capture();
    if (this.frames >= 100) {
      this.stopCapture();
    }
  }
}

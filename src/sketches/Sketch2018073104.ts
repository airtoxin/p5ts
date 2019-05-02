import { Sketch } from "../Sketch";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2018073104 extends Sketch {
  protected SIZE: number = 180;
  protected FRAME_RATE: number = 30;

  setup() {
    super.setup();

    this.p5.ellipseMode(this.p5.CORNER);
    this.startCapture();
  }

  draw() {
    super.draw();

    this.p5.background(100);
    this.p5.stroke(255);
    this.p5.noFill();

    const numCircles = 50 + cyclic(this.p5.frameCount) * 30;
    for (let i = 0; i < numCircles; i++) {
      const size = (i / numCircles) * this.SIZE;
      this.p5.ellipse(0, 0, size, size);
      this.p5.ellipse(size, size, this.SIZE - size, this.SIZE - size);
    }

    this.capture();

    if (this.p5.frameCount >= 360) {
      this.stopCapture();
    }
  }
}

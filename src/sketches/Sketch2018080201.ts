import { Sketch } from "../Sketch";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2018080201 extends Sketch {
  protected SIZE: number = 300;
  protected FRAME_RATE: number = 20;
  private loopSize: number = 180;

  setup() {
    super.setup();

    this.p5.background(0);
    this.startCapture();
  }

  draw() {
    this.p5.background(0);

    for (let i = 0; i < 500; i += 5) {
      if (i % 2 === 0) {
        this.p5.fill(0);
      } else {
        this.p5.fill(255);
      }
      const halfSize = this.SIZE / 2;
      this.p5.ellipse(
        halfSize + this.getDiffX(i),
        halfSize + this.getDiffY(i),
        500 - i,
        500 - i
      );
    }

    this.capture();
    if (this.p5.frameCount >= this.loopSize) {
      this.stopCapture();
    }
  }

  private getDiffX(i: number) {
    const intensity = 50;
    return cyclic(this.p5.frameCount * 2 + i, Math.cos) * intensity;
  }

  private getDiffY(i: number) {
    const intensity = 50;
    return cyclic(this.p5.frameCount * 2 + i, Math.sin) * intensity;
  }
}

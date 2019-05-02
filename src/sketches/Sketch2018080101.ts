import { Sketch } from "../Sketch";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

const X1 = 100 + Math.random() * 200;
const Y1 = 100 + Math.random() * 200;
const X2 = 100 + Math.random() * 200;
const Y2 = 100 + Math.random() * 200;
const X3 = 100 + Math.random() * 100;
const Y3 = 100 + Math.random() * 100;
const X4 = 100 + Math.random() * 100;
const Y4 = 100 + Math.random() * 100;

export class Sketch2018080101 extends Sketch {
  protected FRAME_RATE: number = 20;
  protected SIZE: number = 300;
  setup() {
    super.setup();

    this.startCapture();
  }

  draw() {
    super.draw();

    this.p5.background(100);
    this.p5.stroke(255);
    this.p5.noFill();

    for (let i = 0; i < 300; i += 2) {
      const x1 = cyclic(X1 + this.p5.frameCount * 3) * this.SIZE;
      const y1 = cyclic(Y1 + this.p5.frameCount * 3) * this.SIZE;
      const x2 = cyclic(X2 + this.p5.frameCount * 3) * this.SIZE;
      const y2 = cyclic(Y2 + this.p5.frameCount * 3) * this.SIZE;
      const x3 = cyclic(X3 + this.p5.frameCount * 3) * this.SIZE;
      const y3 = cyclic(Y3 + this.p5.frameCount * 3) * this.SIZE;
      const x4 = cyclic(X4 + this.p5.frameCount * 3) * this.SIZE;
      const y4 = cyclic(Y4 + this.p5.frameCount * 3) * this.SIZE;
      this.p5.bezier(
        x1 + i,
        y1 + i,
        x2 + i,
        y2 + i,
        x3 + i,
        y3 + i,
        x4 + i,
        y4 + i
      );
    }

    this.capture();

    if (this.p5.frameCount >= 120) {
      this.stopCapture();
    }
  }
}

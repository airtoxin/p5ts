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

export class Sketch2018080102 extends Sketch {
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

    for (let i = 0; i < 200; i += 0.5) {
      const x1 =
        cyclic((cyclic(X1 + i) * this.SIZE) / 2 + this.p5.frameCount * 3) *
        this.SIZE;
      const y1 =
        cyclic((cyclic(Y1 + i) * this.SIZE) / 2 + this.p5.frameCount * 3) *
        this.SIZE;
      const x2 =
        cyclic((cyclic(X2 + i) * this.SIZE) / 2 + this.p5.frameCount * 3) *
        this.SIZE;
      const y2 =
        cyclic((cyclic(Y2 + i) * this.SIZE) / 2 + this.p5.frameCount * 3) *
        this.SIZE;
      const x3 =
        cyclic((cyclic(X3 + i) * this.SIZE) / 2 + this.p5.frameCount * 3) *
        this.SIZE;
      const y3 =
        cyclic((cyclic(Y3 + i) * this.SIZE) / 2 + this.p5.frameCount * 3) *
        this.SIZE;
      const x4 =
        cyclic((cyclic(X4 + i) * this.SIZE) / 2 + this.p5.frameCount * 3) *
        this.SIZE;
      const y4 =
        cyclic((cyclic(Y4 + i) * this.SIZE) / 2 + this.p5.frameCount * 3) *
        this.SIZE;
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

import "p5";
import { Sketch } from "../Sketch";
import { Matrix } from "./Matrix";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

export class Sketch2021071103 extends Sketch {
  protected SIZE: number = 500;
  protected FRAME_RATE: number = 60;

  setup() {
    super.setup();
    this.p5.background("black");
    this.p5.stroke(255, 255, 255, 50);
    this.p5.fill("black");
  }

  draw() {
    if (this.p5.frameCount === 1) this.startCapture();

    this.p5.translate(this.SIZE / 2, this.SIZE / 2);

    const i = this.p5.frameCount;
    for (let b = 0; b < this.SIZE / 2; b += 10) {
      const a = this.SIZE / 4;
      const rad = degToRad(i);
      const x = (a - b) * Math.cos(rad) + b * Math.cos(((a - b) / b) * rad);
      const y = (a - b) * Math.sin(rad) - b * Math.sin(((a - b) / b) * rad);

      this.p5.point(x, y);
    }

    this.capture();

    this.p5.resetMatrix();
  }

  onClick(mouseX: number, mouseY: number) {
    super.onClick(mouseX, mouseY);
    this.stopCapture();
  }
}

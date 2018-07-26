import { Sketch } from "../Sketch";

const NUM_DOTS = 100;

const degToRad = (degrees: number) => Math.PI / 180 * degrees;

export class StretchingEllipsesSketch extends Sketch {
  private canvas: HTMLCanvasElement | undefined;

  setup() {
    const renderer = this.p5.createCanvas(500, 500);
    this.p5.noStroke();
    this.canvas = (renderer as any).canvas;
    this.startCapture();
  }

  draw() {
    this.p5.background(100);
    [...Array(NUM_DOTS)].forEach((_, i) => {
      const x = i * 5;
      const y = 250 + Math.cos(degToRad(this.p5.frameCount * i / 4)) * 250;
      this.p5.ellipse(x, y, 3);
    });

    this.capture(this.canvas);

    if (this.p5.frameCount >= 360 * 4) {
      this.stopCapture();
      this.saveCaptured();
    }
  }
}

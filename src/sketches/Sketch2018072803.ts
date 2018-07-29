import { Sketch } from "../Sketch";

export class Sketch2018072803 extends Sketch {
  private canvas: HTMLCanvasElement | undefined;

  setup() {
    const renderer = this.p5.createCanvas(500, 500);
    this.canvas = (renderer as any).canvas;
    this.startCapture();
  }

  draw() {
    this.p5.background(255);
    for (let i = 0; i < 15; i++) {
      this.p5.line();
    }

    this.capture(this.canvas);
    if (this.p5.frameCount >= 200) {
      this.stopCapture();
      this.saveCaptured();
    }
  }
}

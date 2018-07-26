import { Sketch } from "../Sketch";

export class SampleSketch extends Sketch {
  private frames: number = 0;
  private canvas: HTMLCanvasElement | undefined;

  setup() {
    const renderer = this.p5.createCanvas(500, 500);
    this.canvas = (renderer as any).canvas;
    this.startCapture();
  }

  draw() {
    this.frames++;

    this.p5.background(100);
    this.p5.ellipse(Math.random() * 500, Math.random() * 500, Math.random() * 500);

    this.capture(this.canvas);
    if (this.frames >= 100) {
      this.stopCapture();
      this.saveCaptured();
    }
  }
}

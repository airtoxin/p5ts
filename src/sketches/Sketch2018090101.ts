import { Sketch } from "../Sketch";

export class Sketch2018090101 extends Sketch {
  private noiseX = 0;
  private noiseY = 0;
  private noiseT = 0;
  private start = 0;
  private step = 0.02;

  setup() {
    super.setup();
    this.p5.pixelDensity(1);
  }

  draw() {
    super.draw();

    this.p5.loadPixels();
    this.noiseY = this.start;

    for (let y = 0; y < this.p5.height; y++) {
      this.noiseX = this.start;
      for (let x = 0; x < this.p5.width; x++) {
        const c = this.p5.noise(this.noiseX, this.noiseY, this.noiseT) * 255;
        const idx = 4 * (y * this.SIZE + x);
        this.p5.pixels[idx] = c;
        this.p5.pixels[idx + 1] = c;
        this.p5.pixels[idx + 2] = c;
        this.p5.pixels[idx + 3] = 255;

        this.noiseX += this.step;
      }
      this.noiseY += this.step;
    }
    this.noiseT += 0.05;

    this.p5.updatePixels();
  }
}

import { Sketch } from "../Sketch";
import { range } from "lodash";

interface Rect {
  xLeftTop: number;
  yLeftTop: number;
  xRightBottom: number;
  yRightBottom: number;
}

export class Sketch2018093001 extends Sketch {
  protected SIZE: number = 200;
  private RENDER_STEPS: number = 8;
  private dx: number = 0.01;
  private dt: number = 1;
  private du: number = 2e-5;
  private dv: number = 1e-5;
  private f: number = 0.022;
  private k: number = 0.051;
  private u: number[] = [...Array(this.SIZE * this.SIZE)].map(() => 1);
  private v: number[] = [...Array(this.SIZE * this.SIZE)].map(() => 0);

  private noiseX = 0;
  private noiseY = 0;
  private noiseT = 0;
  private start = 0;
  private step = 0.02;

  setup() {
    super.setup();
    this.p5.pixelDensity(1);
    this.initializeDensities();
    this.p5.noLoop();
  }

  draw() {
    super.draw();

    this.p5.loadPixels();
    this.noiseY = this.start;

    for (let y = 0; y < this.p5.height; y++) {
      for (let x = 0; x < this.p5.width; x++) {
        const uidx = y * this.SIZE + x;
        const idx = 4 * uidx;
        const color = this.u[uidx] * 255;
        this.p5.pixels[idx] = color;
        this.p5.pixels[idx+1] = color;
        this.p5.pixels[idx+2] = color;
        this.p5.pixels[idx+3] = 255;
      }
    }

    this.p5.updatePixels();
  }

  private initializeDensities(): void {
    const rect: Rect = {
      xLeftTop: this.SIZE / 2 - 10,
      yLeftTop: this.SIZE / 2 + 10,
      xRightBottom: this.SIZE / 2 + 10,
      yRightBottom: this.SIZE / 2 - 10
    };

    this.setInRect(
      rect,
      () => 0.5 + Math.random() * 0.1,
      () => 0.25 + Math.random() * 0.1
    );
  }

  private setInRect(rect: Rect, fu: (i: number) => number, fv: (i: number) => number): void {
    for (const i of range(this.SIZE * this.SIZE)) {
      const row = Math.floor(i / this.SIZE);
      const col = i % this.SIZE;
      if (rect.yRightBottom <= row && row <= rect.yLeftTop && rect.xLeftTop <= col && col <= rect.xRightBottom) {
        // initial value with some noises
        this.u[i] = fu(i);
        this.v[i] = fv(i);
      }
    }
  }
}

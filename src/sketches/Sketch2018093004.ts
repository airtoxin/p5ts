import { Sketch } from "../Sketch";
import { CellArray } from "./CellArray";
import { Color } from "p5";

const percentage = (min: number, max: number, num: number): number =>
  (num - min) / (max - min);

export class Sketch2018093004 extends Sketch {
  protected SIZE: number = 200;
  private RENDER_STEPS: number = 8;
  private dx: number = 0.01;
  private dt: number = 1;
  private du: number = 2e-5;
  private dv: number = 1e-5;
  private f: number = 0.022;
  private k: number = 0.051;
  private u: CellArray = new CellArray(
    [...Array(this.SIZE * this.SIZE)].map(() => 1),
    this.SIZE
  );
  private v: CellArray = new CellArray(
    [...Array(this.SIZE * this.SIZE)].map(() => 0),
    this.SIZE
  );
  private frameCount: number = 0;

  setup() {
    super.setup();
    this.p5.pixelDensity(1);
    this.initializeDensities();
    this.startCapture();
    this.p5.colorMode(this.p5.HSB);
    // this.p5.noLoop();
  }

  draw() {
    super.draw();
    this.frameCount++;

    this.p5.loadPixels();

    this.updateUv();
    this.applyUToPixels();

    if (this.frameCount % this.RENDER_STEPS === 1) {
      this.capture();
      if (this.frameCount >= 500 * this.RENDER_STEPS) {
        this.stopCapture();
      }
    } else {
      this.draw();
    }
  }

  private initializeDensities(): void {
    const rectSize = 20;
    const borderBottom = this.SIZE / 2 - rectSize / 2;
    const borderTop = this.SIZE / 2 + rectSize / 2;
    this.u = this.u.map((cell, row, col) => {
      if (
        borderBottom <= row &&
        row <= borderTop &&
        borderBottom <= col &&
        col <= borderTop
      ) {
        return 0.5 + Math.random() * 0.1;
      } else {
        return cell;
      }
    });
    this.v = this.v.map((cell, row, col) => {
      if (
        borderBottom <= row &&
        row <= borderTop &&
        borderBottom <= col &&
        col <= borderTop
      ) {
        return 0.25 + Math.random() * 0.1;
      } else {
        return cell;
      }
    });
  }

  private updateUv(): void {
    const laplacianU = this.u
      .roll("up")
      .add(this.u.roll("down"))
      .add(this.u.roll("left"))
      .add(this.u.roll("right"))
      .sub(this.u.mul(4))
      .div(this.dx * this.dx);
    const laplacianV = this.v
      .roll("up")
      .add(this.v.roll("down"))
      .add(this.v.roll("left"))
      .add(this.v.roll("right"))
      .sub(this.v.mul(4))
      .div(this.dx * this.dx);
    const dudt = laplacianU
      .mul(this.du)
      .sub(this.u.mul(this.v).mul(this.v))
      .add(this.u.mul(-1).add(1).mul(this.f));
    const dvdt = laplacianV
      .mul(this.dv)
      .add(this.u.mul(this.v).mul(this.v))
      .sub(this.v.mul(this.f + this.k));
    this.u = this.u.add(dudt.mul(this.dt));
    this.v = this.v.add(dvdt.mul(this.dt));
  }

  private applyUToPixels(): void {
    for (let row = 0; row < this.SIZE; row++) {
      for (let col = 0; col < this.SIZE; col++) {
        const idx = 4 * (row * this.SIZE + col);
        const color = this.getColor(this.u.get(row, col));
        this.p5.pixels[idx] = this.p5.red(color);
        this.p5.pixels[idx + 1] = this.p5.green(color);
        this.p5.pixels[idx + 2] = this.p5.blue(color);
        this.p5.pixels[idx + 3] = 255;
      }
    }
    this.p5.updatePixels();
  }

  private getColor(value: number): Color {
    return this.p5.lerpColor(
      this.p5.color(20, 100, 68),
      this.p5.color(78, 78, 84),
      percentage(0, 1, value)
    );
  }
}

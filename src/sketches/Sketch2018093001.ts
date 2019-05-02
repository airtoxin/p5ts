import { Sketch } from "../Sketch";
import { CellArray } from "./CellArray";

export class Sketch2018093001 extends Sketch {
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

  setup() {
    super.setup();
    this.p5.pixelDensity(1);
    this.initializeDensities();
    this.startCapture();
    // this.p5.noLoop();
  }

  draw() {
    super.draw();

    this.p5.loadPixels();

    this.updateUv();

    for (let row = 0; row < this.SIZE; row++) {
      for (let col = 0; col < this.SIZE; col++) {
        const idx = 4 * (row * this.SIZE + col);
        const color = this.u.get(row, col) * 255;
        this.p5.pixels[idx] = color;
        this.p5.pixels[idx + 1] = color;
        this.p5.pixels[idx + 2] = color;
        this.p5.pixels[idx + 3] = 255;
      }
    }

    this.p5.updatePixels();
    this.capture();

    if (this.p5.frameCount >= 200) {
      this.stopCapture();
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
    const dudt = laplacianU.mul(this.du);
    const dvdt = laplacianV.mul(this.dv);
    this.u = this.u.add(dudt.mul(this.dt));
    this.v = this.v.add(dvdt.mul(this.dt));
  }
}

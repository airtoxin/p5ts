import { Sketch } from "../Sketch";
import { sample, sampleSize } from "lodash";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));
const percentage = (min: number, max: number, num: number): number =>
  (num - min) / (max - min);

type BorderState = "left" | "right" | "top" | "bottom" | "upward" | "downward";
const borders: BorderState[] = [
  "left",
  "right",
  "top",
  "bottom",
  "upward",
  "downward",
];

interface Box {
  x: number;
  y: number;
  size: number;
  border: BorderState;
}

const BOX_SIZE = 5;

export class Sketch2018080401 extends Sketch {
  private boxes: Box[] = [];

  setup() {
    super.setup();

    this.p5.noLoop();
    this.p5.stroke(255);
    this.p5.colorMode(this.p5.HSB);

    for (let y = 0; y < this.SIZE; y += BOX_SIZE) {
      for (let x = 0; x < this.SIZE; x += BOX_SIZE) {
        this.boxes.push({
          x,
          y,
          size: BOX_SIZE,
          border: sample(borders) as BorderState,
        });
      }
    }
  }

  draw() {
    this.p5.background(0);

    for (const box of this.boxes) {
      this.drawBox(box);
    }
  }

  private drawBox({ x, y, size, border }: Box) {
    if (Math.random() < 0.5) {
      this.p5.ellipse(x, y, size / 3, size / 3);
    }

    switch (border) {
      case "left": {
        this.p5.line(x, y, x, y + size);
        return;
      }
      case "right": {
        this.p5.line(x + size, y, x + size, y + size);
        return;
      }
      case "top": {
        this.p5.line(x, y, x + size, y);
        return;
      }
      case "bottom": {
        this.p5.line(x, y + size, x + size, y + size);
        return;
      }
      case "upward": {
        this.p5.line(x, y + size, x + size, y);
        return;
      }
      case "downward": {
        this.p5.line(x, y, x + size, y + size);
        return;
      }
    }
  }
}

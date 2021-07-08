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
  offset: number;
}

const BOX_SIZE = 10;

export class Sketch2018080402 extends Sketch {
  protected SIZE: number = 250;
  protected FRAME_RATE: number = 20;
  private boxes: Box[] = [];

  setup() {
    super.setup();

    this.p5.stroke(255);

    for (let y = 0; y < this.SIZE; y += BOX_SIZE) {
      for (let x = 0; x < this.SIZE; x += BOX_SIZE) {
        const offset = Math.floor(Math.random() * 360);
        this.boxes.push({
          x,
          y,
          size: cyclic(this.p5.frameCount * 2 + offset) * BOX_SIZE,
          border: sample(borders) as BorderState,
          offset,
        });
      }
    }

    this.startCapture();
  }

  draw() {
    super.draw();

    this.p5.background(0);

    this.boxes = this.boxes.map((box) => {
      this.drawBox(box);
      return this.updateBox(box);
    });

    this.capture();

    if (this.p5.frameCount >= 360) {
      this.stopCapture();
    }
  }

  private drawBox({ x, y, size, border }: Box) {
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

  private updateBox(box: Box): Box {
    return {
      ...box,
      size: cyclic(this.p5.frameCount * 2 + box.offset) * BOX_SIZE,
    };
  }
}

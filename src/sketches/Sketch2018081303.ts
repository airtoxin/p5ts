import { Sketch } from "../Sketch";
import { random, sample, range } from "lodash";

const degToRad = (degrees: number): number => degrees * Math.PI / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number => cyclicFn(degToRad(degrees));

const NUM_MARKERS = 500;

interface Point {
  x: number;
  y: number;
}

class Marker {
  constructor(
    private size: number
  ) {}

  private x: number = random(this.size);
  private y: number = random(this.size);
  private direction: number = random(360);
  private acceleration: number = random(2);
  private BASE_THICKNESS: number = random(1);
  public thickness: number = random(this.BASE_THICKNESS);

  private getNextXY(): [number, number] {
    return [
      this.x + Math.cos(degToRad(this.direction)) * this.acceleration,
      this.y + Math.sin(degToRad(this.direction)) * this.acceleration,
    ];
  }

  private revive(): void {
    this.direction = random(360);
    this.acceleration = random(2);
  }

  getLinePoints(): [number, number, number, number] {
    const [nx, ny] = this.getNextXY();
    return [
      this.x,
      this.y,
      nx,
      ny
    ];
  }

  update(p5: p5) {
    this.direction = this.direction + p5.noise(this.x, this.y);
    [this.x, this.y] = this.getNextXY();
    this.acceleration = this.acceleration * 0.9;
    this.thickness = this.BASE_THICKNESS + cyclic(p5.frameCount * 2) * this.BASE_THICKNESS / 2;

    if (this.acceleration <= 1) this.revive();
  }
}

export class Sketch2018081303 extends Sketch {
  private markers: Marker[] = range(NUM_MARKERS).map(() => new Marker(this.SIZE));

  setup() {
    super.setup();

    this.canvas && this.canvas.addEventListener("click", () => this.reset());

    this.reset();
  }

  private reset() {
    this.p5.background(255);
    this.markers = range(NUM_MARKERS).map(() => new Marker(this.SIZE));
  }

  draw() {
    super.draw();

    for (const marker of this.markers) {
      const [x1, y1, x2, y2] = marker.getLinePoints();
      this.p5.strokeWeight(marker.thickness);
      this.p5.line(x1, y1, x2, y2);
      marker.update(this.p5);
    }
  }
}

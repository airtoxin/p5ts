import { Sketch } from "../Sketch";
import { random, sample, range } from "lodash";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

const NUM_MARKERS = 50;

interface Point {
  x: number;
  y: number;
}

class Ant {
  constructor(private size: number) {}

  private x: number = random(this.size);
  private y: number = random(this.size);
  private direction: number = random(360);
  private acceleration: number = random(5);
  private BASE_THICKNESS: number = random(5);
  public thickness: number = random(this.BASE_THICKNESS);

  private getNextXY(): [number, number] {
    return [
      this.x + Math.cos(degToRad(this.direction)) * this.acceleration,
      this.y + Math.sin(degToRad(this.direction)) * this.acceleration,
    ];
  }

  private revive(): void {
    this.direction = random(360);
    this.acceleration = random(5);
  }

  getLinePoints(): [number, number, number, number] {
    const [nx, ny] = this.getNextXY();
    return [this.x, this.y, nx, ny];
  }

  update(frameCount: number) {
    [this.x, this.y] = this.getNextXY();
    this.acceleration = this.acceleration * 0.98;
    this.thickness =
      this.BASE_THICKNESS + (cyclic(frameCount) * this.BASE_THICKNESS) / 2;

    if (this.acceleration <= 0.5) this.revive();
  }
}

export class Sketch2018081302 extends Sketch {
  private ants: Ant[] = range(NUM_MARKERS).map(() => new Ant(this.SIZE));
  private chunks: any[] = [];
  private recorder: any;

  setup() {
    super.setup();

    this.canvas && this.canvas.addEventListener("click", () => this.reset());

    this.reset();

    const stream = (this.canvas as any).captureStream(30);
    this.recorder = new (window as any).MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    });
    this.recorder.ondataavailable = (e: any) => {
      if (e.data.size) {
        this.chunks.push(e.data);
      }
    };
    this.recorder.onstop = () => {
      const blob = new Blob(this.chunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "test.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    };
    this.recorder.start();
  }

  private reset() {
    this.p5.background(255);
    this.ants = range(NUM_MARKERS).map(() => new Ant(this.SIZE));
  }

  draw() {
    super.draw();

    for (const ant of this.ants) {
      const [x1, y1, x2, y2] = ant.getLinePoints();
      this.p5.strokeWeight(ant.thickness);
      this.p5.line(x1, y1, x2, y2);
      ant.update(this.p5.frameCount * 2);
    }

    if (this.p5.frameCount === 500) {
      this.recorder.stop();
    }
  }
}

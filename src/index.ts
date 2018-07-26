import "p5";
import { bindSketchToP5 } from "./Sketch";
import { SampleSketch } from "./sketches/SampleSketch";
import { EllipsesSketch } from "./sketches/EllipsesSketch";

// tslint:disable-next-line
new p5(bindSketchToP5(EllipsesSketch));

import "p5";
import { bindSketchToP5 } from "./Sketch";
import { SampleSketch } from "./sketches/SampleSketch";

// tslint:disable-next-line
new p5(bindSketchToP5(SampleSketch));

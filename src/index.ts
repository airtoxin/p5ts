import "p5";
import { bindSketchToP5 } from "./Sketch";
import { SampleSketch } from "./sketches/SampleSketch";
import { EllipsesSketch } from "./sketches/EllipsesSketch";
import { StretchingEllipsesSketch } from "./sketches/StretchingEllipsesSketch";
import { Sketch20180727 } from "./sketches/Sketch20180727";
import { Sketch2018072801 } from "./sketches/Sketch2018072801";
import { Sketch2018072802 } from "./sketches/Sketch2018072802";
import { Sketch2018072803 } from "./sketches/Sketch2018072803";

// tslint:disable-next-line
new p5(bindSketchToP5(Sketch2018072802));

import { describe, it, expect } from "vitest";
import {
  carvePrecision, handComfort, bladeRetention, controlSpin,
  knifeCost, replaceBlade, ceramicEdge, yokeStyle,
  bestCarving, swivelKnives,
} from "../swivel-knife-calc.js";

describe("carvePrecision", () => {
  it("fine line detail most precise carve", () => {
    expect(carvePrecision("fine_line_detail")).toBeGreaterThan(carvePrecision("cushion_grip_ergo"));
  });
});

describe("handComfort", () => {
  it("cushion grip ergo most comfortable", () => {
    expect(handComfort("cushion_grip_ergo")).toBeGreaterThan(handComfort("fine_line_detail"));
  });
});

describe("bladeRetention", () => {
  it("ceramic blade sharp best blade retention", () => {
    expect(bladeRetention("ceramic_blade_sharp")).toBeGreaterThan(bladeRetention("fine_line_detail"));
  });
});

describe("controlSpin", () => {
  it("fine line detail best control spin", () => {
    expect(controlSpin("fine_line_detail")).toBeGreaterThan(controlSpin("cushion_grip_ergo"));
  });
});

describe("knifeCost", () => {
  it("fine line detail more expensive than barrel yoke", () => {
    expect(knifeCost("fine_line_detail")).toBeGreaterThan(knifeCost("barrel_yoke_standard"));
  });
});

describe("replaceBlade", () => {
  it("barrel yoke standard has replaceable blade", () => {
    expect(replaceBlade("barrel_yoke_standard")).toBe(true);
  });
  it("ceramic blade sharp has no replaceable blade", () => {
    expect(replaceBlade("ceramic_blade_sharp")).toBe(false);
  });
});

describe("ceramicEdge", () => {
  it("ceramic blade sharp has ceramic edge", () => {
    expect(ceramicEdge("ceramic_blade_sharp")).toBe(true);
  });
  it("barrel yoke standard has no ceramic edge", () => {
    expect(ceramicEdge("barrel_yoke_standard")).toBe(false);
  });
});

describe("yokeStyle", () => {
  it("adjustable angle tilt uses tilting pivot yoke", () => {
    expect(yokeStyle("adjustable_angle_tilt")).toBe("tilting_pivot_yoke");
  });
});

describe("bestCarving", () => {
  it("fine line detail best for portrait figure carve", () => {
    expect(bestCarving("fine_line_detail")).toBe("portrait_figure_carve");
  });
});

describe("swivelKnives", () => {
  it("returns 5 types", () => {
    expect(swivelKnives()).toHaveLength(5);
  });
});

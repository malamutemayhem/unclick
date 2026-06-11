import { describe, it, expect } from "vitest";
import {
  flareSmooth, concentricity, speedForm, tubeRange,
  flaringCost, powered, forBrake, dieType,
  bestUse, flaringTools,
} from "../flaring-tool-calc.js";

describe("flareSmooth", () => {
  it("hydraulic press set smoothest flare", () => {
    expect(flareSmooth("hydraulic_press_set")).toBeGreaterThan(flareSmooth("single_flare_cone"));
  });
});

describe("concentricity", () => {
  it("hydraulic press set best concentricity", () => {
    expect(concentricity("hydraulic_press_set")).toBeGreaterThan(concentricity("eccentric_cam_quick"));
  });
});

describe("speedForm", () => {
  it("eccentric cam quick fastest form", () => {
    expect(speedForm("eccentric_cam_quick")).toBeGreaterThan(speedForm("double_flare_brake"));
  });
});

describe("tubeRange", () => {
  it("hydraulic press set widest range", () => {
    expect(tubeRange("hydraulic_press_set")).toBeGreaterThan(tubeRange("spin_flare_drill"));
  });
});

describe("flaringCost", () => {
  it("hydraulic press set most expensive", () => {
    expect(flaringCost("hydraulic_press_set")).toBeGreaterThan(flaringCost("single_flare_cone"));
  });
});

describe("powered", () => {
  it("spin flare drill is powered", () => {
    expect(powered("spin_flare_drill")).toBe(true);
  });
  it("single flare cone not powered", () => {
    expect(powered("single_flare_cone")).toBe(false);
  });
});

describe("forBrake", () => {
  it("double flare brake is for brake", () => {
    expect(forBrake("double_flare_brake")).toBe(true);
  });
  it("single flare cone not for brake", () => {
    expect(forBrake("single_flare_cone")).toBe(false);
  });
});

describe("dieType", () => {
  it("eccentric cam quick uses cam lever press", () => {
    expect(dieType("eccentric_cam_quick")).toBe("cam_lever_press");
  });
});

describe("bestUse", () => {
  it("double flare brake best for brake line double", () => {
    expect(bestUse("double_flare_brake")).toBe("brake_line_double");
  });
});

describe("flaringTools", () => {
  it("returns 5 types", () => {
    expect(flaringTools()).toHaveLength(5);
  });
});

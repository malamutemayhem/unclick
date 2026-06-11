import { describe, it, expect } from "vitest";
import {
  accuracy, speed, easeOfUse, range,
  saCost, digital, forLongSpan, sensor,
  bestUse, shaftAlignTypes,
} from "../shaft-align-calc.js";

describe("accuracy", () => {
  it("laser dual beam most accurate", () => {
    expect(accuracy("laser_dual_beam")).toBeGreaterThan(accuracy("dial_indicator_rim_face"));
  });
});

describe("speed", () => {
  it("laser dual beam fastest", () => {
    expect(speed("laser_dual_beam")).toBeGreaterThan(speed("optical_telescope_bore"));
  });
});

describe("easeOfUse", () => {
  it("laser dual beam easiest to use", () => {
    expect(easeOfUse("laser_dual_beam")).toBeGreaterThan(easeOfUse("dial_indicator_rim_face"));
  });
});

describe("range", () => {
  it("laser dual beam longest range", () => {
    expect(range("laser_dual_beam")).toBeGreaterThanOrEqual(range("optical_telescope_bore"));
  });
});

describe("saCost", () => {
  it("laser dual beam most expensive", () => {
    expect(saCost("laser_dual_beam")).toBeGreaterThan(saCost("dial_indicator_rim_face"));
  });
});

describe("digital", () => {
  it("laser single beam is digital", () => {
    expect(digital("laser_single_beam")).toBe(true);
  });
  it("dial indicator not digital", () => {
    expect(digital("dial_indicator_rim_face")).toBe(false);
  });
});

describe("forLongSpan", () => {
  it("laser dual beam for long span", () => {
    expect(forLongSpan("laser_dual_beam")).toBe(true);
  });
  it("dial indicator not for long span", () => {
    expect(forLongSpan("dial_indicator_rim_face")).toBe(false);
  });
});

describe("sensor", () => {
  it("optical telescope uses alignment telescope target", () => {
    expect(sensor("optical_telescope_bore")).toBe("alignment_telescope_optical_target");
  });
});

describe("bestUse", () => {
  it("laser dual beam for turbine generator", () => {
    expect(bestUse("laser_dual_beam")).toBe("turbine_generator_cardan_shaft");
  });
});

describe("shaftAlignTypes", () => {
  it("returns 5 types", () => {
    expect(shaftAlignTypes()).toHaveLength(5);
  });
});

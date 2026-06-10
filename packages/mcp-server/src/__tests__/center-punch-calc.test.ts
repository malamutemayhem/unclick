import { describe, it, expect } from "vitest";
import {
  markDepth, pointAccuracy, forceControl, versatility,
  punchCost, springLoaded, needsHammer, tipAngle,
  bestUse, centerPunches,
} from "../center-punch-calc.js";

describe("markDepth", () => {
  it("dot punch witness deepest mark", () => {
    expect(markDepth("dot_punch_witness")).toBeGreaterThan(markDepth("transfer_punch_hole"));
  });
});

describe("pointAccuracy", () => {
  it("prick punch layout most accurate", () => {
    expect(pointAccuracy("prick_punch_layout")).toBeGreaterThan(pointAccuracy("pin_punch_through"));
  });
});

describe("forceControl", () => {
  it("automatic spring load best force control", () => {
    expect(forceControl("automatic_spring_load")).toBeGreaterThan(forceControl("pin_punch_through"));
  });
});

describe("versatility", () => {
  it("pin punch through most versatile", () => {
    expect(versatility("pin_punch_through")).toBeGreaterThan(versatility("transfer_punch_hole"));
  });
});

describe("punchCost", () => {
  it("automatic spring load most expensive", () => {
    expect(punchCost("automatic_spring_load")).toBeGreaterThan(punchCost("pin_punch_through"));
  });
});

describe("springLoaded", () => {
  it("automatic spring load is spring loaded", () => {
    expect(springLoaded("automatic_spring_load")).toBe(true);
  });
  it("pin punch through not spring loaded", () => {
    expect(springLoaded("pin_punch_through")).toBe(false);
  });
});

describe("needsHammer", () => {
  it("pin punch through needs hammer", () => {
    expect(needsHammer("pin_punch_through")).toBe(true);
  });
  it("automatic spring load no hammer needed", () => {
    expect(needsHammer("automatic_spring_load")).toBe(false);
  });
});

describe("tipAngle", () => {
  it("automatic spring load uses 90 degree center", () => {
    expect(tipAngle("automatic_spring_load")).toBe("90_degree_center");
  });
});

describe("bestUse", () => {
  it("prick punch layout best for layout line mark", () => {
    expect(bestUse("prick_punch_layout")).toBe("layout_line_mark");
  });
});

describe("centerPunches", () => {
  it("returns 5 types", () => {
    expect(centerPunches()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  aspectRatio, ringsPerSqInch, ringsNeeded, wireLength, wireDiameter,
  mandrelSize, weightPerSqInch, closureMethod, difficulty,
  timePerSqInch, projectTime, weavePatterns,
} from "../chainmail-calc.js";

describe("aspectRatio", () => {
  it("correct ratio", () => {
    expect(aspectRatio(6, 1.5)).toBe(4);
  });
  it("zero wire = 0", () => {
    expect(aspectRatio(6, 0)).toBe(0);
  });
});

describe("ringsPerSqInch", () => {
  it("european_4in1 = 80", () => {
    expect(ringsPerSqInch("european_4in1")).toBe(80);
  });
});

describe("ringsNeeded", () => {
  it("positive count with waste", () => {
    expect(ringsNeeded(10, "european_4in1")).toBeGreaterThan(800);
  });
});

describe("wireLength", () => {
  it("positive meters", () => {
    expect(wireLength(1000, 6, 1.5)).toBeGreaterThan(0);
  });
});

describe("wireDiameter", () => {
  it("gauge 18 = 1.02mm", () => {
    expect(wireDiameter(18)).toBe(1.02);
  });
});

describe("mandrelSize", () => {
  it("equals inner diameter", () => {
    expect(mandrelSize(6)).toBe(6);
  });
});

describe("weightPerSqInch", () => {
  it("positive weight", () => {
    expect(weightPerSqInch("european_4in1", 18)).toBeGreaterThan(0);
  });
});

describe("closureMethod", () => {
  it("heavy gauge = solder", () => {
    expect(closureMethod(14)).toContain("solder");
  });
  it("light gauge = butted", () => {
    expect(closureMethod(18)).toBe("butted");
  });
});

describe("difficulty", () => {
  it("dragonscale hardest", () => {
    expect(difficulty("dragonscale")).toBeGreaterThan(difficulty("european_4in1"));
  });
});

describe("timePerSqInch", () => {
  it("positive minutes", () => {
    expect(timePerSqInch("byzantine")).toBeGreaterThan(0);
  });
});

describe("projectTime", () => {
  it("positive hours", () => {
    expect(projectTime(50, "european_4in1")).toBeGreaterThan(0);
  });
});

describe("weavePatterns", () => {
  it("returns 6 patterns", () => {
    expect(weavePatterns()).toHaveLength(6);
  });
});

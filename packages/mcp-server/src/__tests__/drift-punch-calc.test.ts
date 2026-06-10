import { describe, it, expect } from "vitest";
import {
  holeSizeMm, driftLengthCm, hammerBlowsRequired, materialRemoved,
  heatRequired, taperAngleDeg, toolSteelGrade, regrindCycles,
  costEstimate, punchTypes,
} from "../drift-punch-calc.js";

describe("holeSizeMm", () => {
  it("hollow makes largest holes", () => {
    expect(holeSizeMm("hollow").max).toBeGreaterThan(
      holeSizeMm("round").max
    );
  });
});

describe("driftLengthCm", () => {
  it("tapered is longest", () => {
    expect(driftLengthCm("tapered")).toBeGreaterThan(
      driftLengthCm("hollow")
    );
  });
});

describe("hammerBlowsRequired", () => {
  it("hollow needs fewest blows", () => {
    expect(hammerBlowsRequired("hollow")).toBeLessThan(
      hammerBlowsRequired("slotted")
    );
  });
});

describe("materialRemoved", () => {
  it("hollow removes material", () => {
    expect(materialRemoved("hollow")).toBe(true);
  });
  it("round does not remove material", () => {
    expect(materialRemoved("round")).toBe(false);
  });
});

describe("heatRequired", () => {
  it("round requires heat", () => {
    expect(heatRequired("round")).toBe(true);
  });
});

describe("taperAngleDeg", () => {
  it("tapered has steepest angle", () => {
    expect(taperAngleDeg("tapered")).toBeGreaterThan(
      taperAngleDeg("round")
    );
  });
});

describe("toolSteelGrade", () => {
  it("round uses S2 steel", () => {
    expect(toolSteelGrade("round")).toBe("S2");
  });
});

describe("regrindCycles", () => {
  it("tapered has most regrind cycles", () => {
    expect(regrindCycles("tapered")).toBeGreaterThan(
      regrindCycles("hollow")
    );
  });
});

describe("costEstimate", () => {
  it("hollow is most expensive", () => {
    expect(costEstimate("hollow")).toBeGreaterThan(costEstimate("round"));
  });
});

describe("punchTypes", () => {
  it("returns 5 types", () => {
    expect(punchTypes()).toHaveLength(5);
  });
});

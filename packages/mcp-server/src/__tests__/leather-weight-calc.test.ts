import { describe, it, expect } from "vitest";
import {
  thicknessOz, thicknessMm, rigidity,
  toolability, sewability, machineSewable,
  bestProject, pricePerSqFt, breakInDays, leatherWeights,
} from "../leather-weight-calc.js";

describe("thicknessOz", () => {
  it("extra heavy is thickest", () => {
    expect(thicknessOz("extra_heavy")).toBeGreaterThan(
      thicknessOz("garment")
    );
  });
});

describe("thicknessMm", () => {
  it("extra heavy is thickest in mm", () => {
    expect(thicknessMm("extra_heavy")).toBeGreaterThan(
      thicknessMm("garment")
    );
  });
});

describe("rigidity", () => {
  it("extra heavy is most rigid", () => {
    expect(rigidity("extra_heavy")).toBeGreaterThan(
      rigidity("garment")
    );
  });
});

describe("toolability", () => {
  it("heavy is most toolable", () => {
    expect(toolability("heavy")).toBeGreaterThan(
      toolability("garment")
    );
  });
});

describe("sewability", () => {
  it("garment is easiest to sew", () => {
    expect(sewability("garment")).toBeGreaterThan(
      sewability("extra_heavy")
    );
  });
});

describe("machineSewable", () => {
  it("garment is machine sewable", () => {
    expect(machineSewable("garment")).toBe(true);
  });
  it("heavy is not", () => {
    expect(machineSewable("heavy")).toBe(false);
  });
});

describe("bestProject", () => {
  it("garment weight is best for jackets", () => {
    expect(bestProject("garment")).toBe("jackets");
  });
});

describe("pricePerSqFt", () => {
  it("garment costs most", () => {
    expect(pricePerSqFt("garment")).toBeGreaterThan(
      pricePerSqFt("lightweight")
    );
  });
});

describe("breakInDays", () => {
  it("extra heavy takes longest to break in", () => {
    expect(breakInDays("extra_heavy")).toBeGreaterThan(
      breakInDays("garment")
    );
  });
});

describe("leatherWeights", () => {
  it("returns 5 weights", () => {
    expect(leatherWeights()).toHaveLength(5);
  });
});

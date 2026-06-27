import { describe, it, expect } from "vitest";
import {
  spanMeters, loadDistribution, lightAdmission,
  buildComplexity, decorativePotential, needsExternalButtress,
  selfSupporting, bestApplication, costPerM2, vaultTypes,
} from "../vault-type-calc.js";

describe("spanMeters", () => {
  it("ribbed spans widest", () => {
    expect(spanMeters("ribbed")).toBeGreaterThan(
      spanMeters("cloister")
    );
  });
});

describe("loadDistribution", () => {
  it("ribbed distributes best", () => {
    expect(loadDistribution("ribbed")).toBeGreaterThan(
      loadDistribution("barrel")
    );
  });
});

describe("lightAdmission", () => {
  it("ribbed admits most light", () => {
    expect(lightAdmission("ribbed")).toBeGreaterThan(
      lightAdmission("barrel")
    );
  });
});

describe("buildComplexity", () => {
  it("fan is most complex", () => {
    expect(buildComplexity("fan")).toBeGreaterThan(
      buildComplexity("barrel")
    );
  });
});

describe("decorativePotential", () => {
  it("fan has highest decorative potential", () => {
    expect(decorativePotential("fan")).toBeGreaterThan(
      decorativePotential("barrel")
    );
  });
});

describe("needsExternalButtress", () => {
  it("barrel needs buttress", () => {
    expect(needsExternalButtress("barrel")).toBe(true);
  });
  it("groin does not", () => {
    expect(needsExternalButtress("groin")).toBe(false);
  });
});

describe("selfSupporting", () => {
  it("groin is self supporting", () => {
    expect(selfSupporting("groin")).toBe(true);
  });
  it("barrel is not", () => {
    expect(selfSupporting("barrel")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("ribbed best for gothic cathedral", () => {
    expect(bestApplication("ribbed")).toBe("gothic_cathedral");
  });
});

describe("costPerM2", () => {
  it("fan costs most", () => {
    expect(costPerM2("fan")).toBeGreaterThan(
      costPerM2("barrel")
    );
  });
});

describe("vaultTypes", () => {
  it("returns 5 types", () => {
    expect(vaultTypes()).toHaveLength(5);
  });
});

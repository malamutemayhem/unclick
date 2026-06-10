import { describe, it, expect } from "vitest";
import {
  compressiveStrengthPsi, flexuralStrength, workability,
  waterRetention, cureTimeDays, loadBearing,
  belowGrade, bestApplication, costPerBag, mortarTypes,
} from "../mortar-type-calc.js";

describe("compressiveStrengthPsi", () => {
  it("type m is strongest", () => {
    expect(compressiveStrengthPsi("type_m")).toBeGreaterThan(
      compressiveStrengthPsi("type_k")
    );
  });
});

describe("flexuralStrength", () => {
  it("type s has best flexural strength", () => {
    expect(flexuralStrength("type_s")).toBeGreaterThan(
      flexuralStrength("type_k")
    );
  });
});

describe("workability", () => {
  it("type o is most workable", () => {
    expect(workability("type_o")).toBeGreaterThan(
      workability("type_m")
    );
  });
});

describe("waterRetention", () => {
  it("type k retains most water", () => {
    expect(waterRetention("type_k")).toBeGreaterThan(
      waterRetention("type_m")
    );
  });
});

describe("cureTimeDays", () => {
  it("type m takes longest to cure", () => {
    expect(cureTimeDays("type_m")).toBeGreaterThan(
      cureTimeDays("type_k")
    );
  });
});

describe("loadBearing", () => {
  it("type m is load bearing", () => {
    expect(loadBearing("type_m")).toBe(true);
  });
  it("type o is not load bearing", () => {
    expect(loadBearing("type_o")).toBe(false);
  });
});

describe("belowGrade", () => {
  it("type m works below grade", () => {
    expect(belowGrade("type_m")).toBe(true);
  });
  it("type n does not", () => {
    expect(belowGrade("type_n")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("type m for foundation", () => {
    expect(bestApplication("type_m")).toBe("foundation");
  });
});

describe("costPerBag", () => {
  it("type m costs most", () => {
    expect(costPerBag("type_m")).toBeGreaterThan(costPerBag("type_k"));
  });
});

describe("mortarTypes", () => {
  it("returns 5 types", () => {
    expect(mortarTypes()).toHaveLength(5);
  });
});

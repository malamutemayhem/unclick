import { describe, it, expect } from "vitest";
import {
  meltingTempCelsius, surfaceTexture, foodSafe,
  colorRange, thermalExpansion, crazingRisk,
  historicalUse, toxicity, costPerKg, glazeBases,
} from "../glaze-chemistry-calc.js";

describe("meltingTempCelsius", () => {
  it("feldspar melts at highest temp", () => {
    expect(meltingTempCelsius("feldspar")).toBeGreaterThan(
      meltingTempCelsius("lead")
    );
  });
});

describe("surfaceTexture", () => {
  it("lead produces glossy finish", () => {
    expect(surfaceTexture("lead")).toBe("glossy");
  });
});

describe("foodSafe", () => {
  it("feldspar is food safe", () => {
    expect(foodSafe("feldspar")).toBe(true);
  });
  it("lead is not food safe", () => {
    expect(foodSafe("lead")).toBe(false);
  });
});

describe("colorRange", () => {
  it("lead has widest color range", () => {
    expect(colorRange("lead")).toBeGreaterThan(
      colorRange("ash")
    );
  });
});

describe("thermalExpansion", () => {
  it("lead expands most", () => {
    expect(thermalExpansion("lead")).toBeGreaterThan(
      thermalExpansion("lithium")
    );
  });
});

describe("crazingRisk", () => {
  it("lead has highest crazing risk", () => {
    expect(crazingRisk("lead")).toBeGreaterThan(
      crazingRisk("lithium")
    );
  });
});

describe("historicalUse", () => {
  it("ash glazes are historical", () => {
    expect(historicalUse("ash")).toBe(true);
  });
  it("boron is not historical", () => {
    expect(historicalUse("boron")).toBe(false);
  });
});

describe("toxicity", () => {
  it("lead is most toxic", () => {
    expect(toxicity("lead")).toBeGreaterThan(
      toxicity("feldspar")
    );
  });
});

describe("costPerKg", () => {
  it("lithium costs most", () => {
    expect(costPerKg("lithium")).toBeGreaterThan(
      costPerKg("ash")
    );
  });
});

describe("glazeBases", () => {
  it("returns 5 bases", () => {
    expect(glazeBases()).toHaveLength(5);
  });
});

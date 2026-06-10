import { describe, it, expect } from "vitest";
import {
  hardness, glossLevel, dryingTimeHours,
  coatsRequired, repairability, foodSafe,
  naturalOrigin, bestApplication, costPerLiter, lacquerTypes,
} from "../lacquer-type-calc.js";

describe("hardness", () => {
  it("urushi is hardest", () => {
    expect(hardness("urushi")).toBeGreaterThan(hardness("shellac"));
  });
});

describe("glossLevel", () => {
  it("urushi has highest gloss", () => {
    expect(glossLevel("urushi")).toBeGreaterThan(glossLevel("acrylic"));
  });
});

describe("dryingTimeHours", () => {
  it("shellac dries fastest", () => {
    expect(dryingTimeHours("shellac")).toBeLessThan(
      dryingTimeHours("urushi")
    );
  });
});

describe("coatsRequired", () => {
  it("urushi needs most coats", () => {
    expect(coatsRequired("urushi")).toBeGreaterThan(
      coatsRequired("polyurethane")
    );
  });
});

describe("repairability", () => {
  it("shellac is most repairable", () => {
    expect(repairability("shellac")).toBeGreaterThan(
      repairability("polyurethane")
    );
  });
});

describe("foodSafe", () => {
  it("urushi is food safe", () => {
    expect(foodSafe("urushi")).toBe(true);
  });
  it("nitrocellulose is not food safe", () => {
    expect(foodSafe("nitrocellulose")).toBe(false);
  });
});

describe("naturalOrigin", () => {
  it("shellac is natural", () => {
    expect(naturalOrigin("shellac")).toBe(true);
  });
  it("acrylic is not natural", () => {
    expect(naturalOrigin("acrylic")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("nitrocellulose for guitar finish", () => {
    expect(bestApplication("nitrocellulose")).toBe("guitar_finish");
  });
});

describe("costPerLiter", () => {
  it("urushi costs most", () => {
    expect(costPerLiter("urushi")).toBeGreaterThan(
      costPerLiter("acrylic")
    );
  });
});

describe("lacquerTypes", () => {
  it("returns 5 types", () => {
    expect(lacquerTypes()).toHaveLength(5);
  });
});

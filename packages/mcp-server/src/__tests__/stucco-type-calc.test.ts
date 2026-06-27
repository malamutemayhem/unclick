import { describe, it, expect } from "vitest";
import {
  durability, flexibility, insulation, aesthetic,
  stCost, breathable, forExterior, binder,
  bestUse, stuccoTypes,
} from "../stucco-type-calc.js";

describe("durability", () => {
  it("traditional most durable", () => {
    expect(durability("traditional_three_coat")).toBeGreaterThan(durability("eifs_synthetic_foam"));
  });
});

describe("flexibility", () => {
  it("acrylic most flexible", () => {
    expect(flexibility("acrylic_finish_thin")).toBeGreaterThan(flexibility("traditional_three_coat"));
  });
});

describe("insulation", () => {
  it("eifs best insulation", () => {
    expect(insulation("eifs_synthetic_foam")).toBeGreaterThan(insulation("traditional_three_coat"));
  });
});

describe("aesthetic", () => {
  it("lime plaster best aesthetic", () => {
    expect(aesthetic("lime_plaster_historic")).toBeGreaterThan(aesthetic("one_coat_modified"));
  });
});

describe("stCost", () => {
  it("lime plaster most expensive", () => {
    expect(stCost("lime_plaster_historic")).toBeGreaterThan(stCost("one_coat_modified"));
  });
});

describe("breathable", () => {
  it("traditional is breathable", () => {
    expect(breathable("traditional_three_coat")).toBe(true);
  });
  it("eifs not breathable", () => {
    expect(breathable("eifs_synthetic_foam")).toBe(false);
  });
});

describe("forExterior", () => {
  it("all for exterior", () => {
    expect(forExterior("traditional_three_coat")).toBe(true);
  });
});

describe("binder", () => {
  it("lime uses natural hydraulic lime", () => {
    expect(binder("lime_plaster_historic")).toBe("natural_hydraulic_lime_putty");
  });
});

describe("bestUse", () => {
  it("eifs for commercial insulation", () => {
    expect(bestUse("eifs_synthetic_foam")).toBe("commercial_continuous_insulation");
  });
});

describe("stuccoTypes", () => {
  it("returns 5 types", () => {
    expect(stuccoTypes()).toHaveLength(5);
  });
});

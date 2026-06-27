import { describe, it, expect } from "vitest";
import {
  span, durability, aesthetic, light,
  cnCost, retractable, forEntrance, structure,
  bestUse, canopyTypeTypes,
} from "../canopy-type-calc.js";

describe("span", () => {
  it("tension fabric longest span", () => {
    expect(span("tension_fabric_membrane")).toBeGreaterThan(span("glass_canopy_spider"));
  });
});

describe("durability", () => {
  it("standing seam most durable", () => {
    expect(durability("standing_seam_metal")).toBeGreaterThan(durability("retractable_motorized"));
  });
});

describe("aesthetic", () => {
  it("glass canopy best aesthetic", () => {
    expect(aesthetic("glass_canopy_spider")).toBeGreaterThan(aesthetic("standing_seam_metal"));
  });
});

describe("light", () => {
  it("glass canopy most light", () => {
    expect(light("glass_canopy_spider")).toBeGreaterThan(light("standing_seam_metal"));
  });
});

describe("cnCost", () => {
  it("glass canopy most expensive", () => {
    expect(cnCost("glass_canopy_spider")).toBeGreaterThan(cnCost("tension_fabric_membrane"));
  });
});

describe("retractable", () => {
  it("motorized is retractable", () => {
    expect(retractable("retractable_motorized")).toBe(true);
  });
  it("cantilever not retractable", () => {
    expect(retractable("cantilever_steel_blade")).toBe(false);
  });
});

describe("forEntrance", () => {
  it("cantilever for entrance", () => {
    expect(forEntrance("cantilever_steel_blade")).toBe(true);
  });
  it("tension fabric not for entrance", () => {
    expect(forEntrance("tension_fabric_membrane")).toBe(false);
  });
});

describe("structure", () => {
  it("tension fabric uses ptfe cable", () => {
    expect(structure("tension_fabric_membrane")).toBe("ptfe_etfe_tensioned_cable");
  });
});

describe("bestUse", () => {
  it("retractable for restaurant patio", () => {
    expect(bestUse("retractable_motorized")).toBe("restaurant_patio_retractable");
  });
});

describe("canopyTypeTypes", () => {
  it("returns 5 types", () => {
    expect(canopyTypeTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  flow, durability, aesthetic, maintenance,
  spCost, enclosed, forOverflow, material,
  bestUse, scupperTypes,
} from "../scupper-type-calc.js";

describe("flow", () => {
  it("overflow highest flow", () => {
    expect(flow("overflow_emergency")).toBeGreaterThan(flow("decorative_gargoyle"));
  });
});

describe("durability", () => {
  it("conductor head most durable", () => {
    expect(durability("conductor_head_box")).toBeGreaterThan(durability("through_parapet_open"));
  });
});

describe("aesthetic", () => {
  it("gargoyle best aesthetic", () => {
    expect(aesthetic("decorative_gargoyle")).toBeGreaterThan(aesthetic("overflow_emergency"));
  });
});

describe("maintenance", () => {
  it("open parapet low maintenance", () => {
    expect(maintenance("through_parapet_open")).toBeGreaterThan(maintenance("decorative_gargoyle"));
  });
});

describe("spCost", () => {
  it("gargoyle most expensive", () => {
    expect(spCost("decorative_gargoyle")).toBeGreaterThan(spCost("through_parapet_open"));
  });
});

describe("enclosed", () => {
  it("through wall is enclosed", () => {
    expect(enclosed("through_wall_channel")).toBe(true);
  });
  it("through parapet not enclosed", () => {
    expect(enclosed("through_parapet_open")).toBe(false);
  });
});

describe("forOverflow", () => {
  it("overflow emergency for overflow", () => {
    expect(forOverflow("overflow_emergency")).toBe(true);
  });
  it("through wall not overflow", () => {
    expect(forOverflow("through_wall_channel")).toBe(false);
  });
});

describe("material", () => {
  it("gargoyle uses cast stone bronze", () => {
    expect(material("decorative_gargoyle")).toBe("cast_stone_bronze_ornamental");
  });
});

describe("bestUse", () => {
  it("conductor head for downspout", () => {
    expect(bestUse("conductor_head_box")).toBe("downspout_transition_collector");
  });
});

describe("scupperTypes", () => {
  it("returns 5 types", () => {
    expect(scupperTypes()).toHaveLength(5);
  });
});

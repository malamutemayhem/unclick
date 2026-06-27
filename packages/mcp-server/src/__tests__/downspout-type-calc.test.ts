import { describe, it, expect } from "vitest";
import {
  capacity, aesthetic, durability, noise,
  dsCost, enclosed, forCommercial, material,
  bestUse, downspoutTypeTypes,
} from "../downspout-type-calc.js";

describe("capacity", () => {
  it("internal drain highest capacity", () => {
    expect(capacity("internal_roof_drain_leader")).toBeGreaterThan(capacity("chain_rain_decorative_guide"));
  });
});

describe("aesthetic", () => {
  it("rain chain best aesthetic", () => {
    expect(aesthetic("chain_rain_decorative_guide")).toBeGreaterThan(aesthetic("scupper_through_wall_outlet"));
  });
});

describe("durability", () => {
  it("internal drain most durable", () => {
    expect(durability("internal_roof_drain_leader")).toBeGreaterThan(durability("chain_rain_decorative_guide"));
  });
});

describe("noise", () => {
  it("rain chain quietest (highest noise score)", () => {
    expect(noise("chain_rain_decorative_guide")).toBeGreaterThan(noise("scupper_through_wall_outlet"));
  });
});

describe("dsCost", () => {
  it("internal drain most expensive", () => {
    expect(dsCost("internal_roof_drain_leader")).toBeGreaterThan(dsCost("rectangular_corrugated_std"));
  });
});

describe("enclosed", () => {
  it("rectangular is enclosed", () => {
    expect(enclosed("rectangular_corrugated_std")).toBe(true);
  });
  it("rain chain not enclosed", () => {
    expect(enclosed("chain_rain_decorative_guide")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("internal drain for commercial", () => {
    expect(forCommercial("internal_roof_drain_leader")).toBe(true);
  });
  it("rectangular not for commercial", () => {
    expect(forCommercial("rectangular_corrugated_std")).toBe(false);
  });
});

describe("material", () => {
  it("rain chain uses copper link cup", () => {
    expect(material("chain_rain_decorative_guide")).toBe("copper_link_cup_chain_guide");
  });
});

describe("bestUse", () => {
  it("scupper for flat roof overflow", () => {
    expect(bestUse("scupper_through_wall_outlet")).toBe("flat_roof_parapet_overflow_outlet");
  });
});

describe("downspoutTypeTypes", () => {
  it("returns 5 types", () => {
    expect(downspoutTypeTypes()).toHaveLength(5);
  });
});

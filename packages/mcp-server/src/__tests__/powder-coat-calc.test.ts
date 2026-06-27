import { describe, it, expect } from "vitest";
import {
  durability, uvResist, chemResist, finish,
  pcCost, outdoor, forArchitectural, resin,
  bestUse, powderCoatTypes,
} from "../powder-coat-calc.js";

describe("durability", () => {
  it("fluoropolymer most durable", () => {
    expect(durability("fluoropolymer_pvdf")).toBeGreaterThan(durability("hybrid_epoxy_poly"));
  });
});

describe("uvResist", () => {
  it("fluoropolymer best uv resistance", () => {
    expect(uvResist("fluoropolymer_pvdf")).toBeGreaterThan(uvResist("epoxy_functional"));
  });
});

describe("chemResist", () => {
  it("epoxy best chemical resistance", () => {
    expect(chemResist("epoxy_functional")).toBeGreaterThan(chemResist("polyester_tgic"));
  });
});

describe("finish", () => {
  it("polyurethane best finish quality", () => {
    expect(finish("polyurethane_smooth")).toBeGreaterThan(finish("epoxy_functional"));
  });
});

describe("pcCost", () => {
  it("fluoropolymer most expensive", () => {
    expect(pcCost("fluoropolymer_pvdf")).toBeGreaterThan(pcCost("epoxy_functional"));
  });
});

describe("outdoor", () => {
  it("polyester tgic is outdoor rated", () => {
    expect(outdoor("polyester_tgic")).toBe(true);
  });
  it("epoxy not outdoor rated", () => {
    expect(outdoor("epoxy_functional")).toBe(false);
  });
});

describe("forArchitectural", () => {
  it("fluoropolymer for architectural", () => {
    expect(forArchitectural("fluoropolymer_pvdf")).toBe(true);
  });
  it("epoxy not for architectural", () => {
    expect(forArchitectural("epoxy_functional")).toBe(false);
  });
});

describe("resin", () => {
  it("fluoropolymer uses pvdf kynar resin", () => {
    expect(resin("fluoropolymer_pvdf")).toBe("pvdf_70_pct_kynar_resin_premium_weather");
  });
});

describe("bestUse", () => {
  it("polyester for aluminum facade", () => {
    expect(bestUse("polyester_tgic")).toBe("aluminum_extrusion_facade_railing_outdoor");
  });
});

describe("powderCoatTypes", () => {
  it("returns 5 types", () => {
    expect(powderCoatTypes()).toHaveLength(5);
  });
});

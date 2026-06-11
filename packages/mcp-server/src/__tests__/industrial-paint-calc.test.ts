import { describe, it, expect } from "vitest";
import {
  corrosionResist, uvResist, adhesion, life,
  ipCost, fireRated, forMarine, binder,
  bestUse, industrialPaintTypes,
} from "../industrial-paint-calc.js";

describe("corrosionResist", () => {
  it("zinc rich primer best corrosion resist", () => {
    expect(corrosionResist("zinc_rich_primer")).toBeGreaterThan(corrosionResist("intumescent_fire_protect"));
  });
});

describe("uvResist", () => {
  it("polyurethane topcoat best UV resist", () => {
    expect(uvResist("polyurethane_topcoat")).toBeGreaterThan(uvResist("epoxy_primer_two_part"));
  });
});

describe("adhesion", () => {
  it("epoxy primer best adhesion", () => {
    expect(adhesion("epoxy_primer_two_part")).toBeGreaterThan(adhesion("fluoropolymer_pvdf"));
  });
});

describe("life", () => {
  it("zinc rich primer longest life", () => {
    expect(life("zinc_rich_primer")).toBeGreaterThan(life("intumescent_fire_protect"));
  });
});

describe("ipCost", () => {
  it("fluoropolymer most expensive", () => {
    expect(ipCost("fluoropolymer_pvdf")).toBeGreaterThan(ipCost("epoxy_primer_two_part"));
  });
});

describe("fireRated", () => {
  it("intumescent is fire rated", () => {
    expect(fireRated("intumescent_fire_protect")).toBe(true);
  });
  it("epoxy primer not fire rated", () => {
    expect(fireRated("epoxy_primer_two_part")).toBe(false);
  });
});

describe("forMarine", () => {
  it("epoxy primer for marine", () => {
    expect(forMarine("epoxy_primer_two_part")).toBe(true);
  });
  it("fluoropolymer not for marine", () => {
    expect(forMarine("fluoropolymer_pvdf")).toBe(false);
  });
});

describe("binder", () => {
  it("intumescent uses acrylic char forming", () => {
    expect(binder("intumescent_fire_protect")).toBe("acrylic_intumescent_char_forming");
  });
});

describe("bestUse", () => {
  it("fluoropolymer for architectural curtain wall", () => {
    expect(bestUse("fluoropolymer_pvdf")).toBe("architectural_curtain_wall_panel");
  });
});

describe("industrialPaintTypes", () => {
  it("returns 5 types", () => {
    expect(industrialPaintTypes()).toHaveLength(5);
  });
});

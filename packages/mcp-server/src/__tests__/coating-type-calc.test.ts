import { describe, it, expect } from "vitest";
import {
  hardness, chemResist, uvStability, thickness,
  coCost, twoComponent, forSteel, application,
  bestUse, coatingTypes,
} from "../coating-type-calc.js";

describe("hardness", () => {
  it("ceramic hardest", () => {
    expect(hardness("ceramic_thermal_spray")).toBeGreaterThan(hardness("fluoropolymer_ptfe_nonstick"));
  });
});

describe("chemResist", () => {
  it("fluoropolymer best chemical resistance", () => {
    expect(chemResist("fluoropolymer_ptfe_nonstick")).toBeGreaterThan(chemResist("zinc_rich_galvanic_primer"));
  });
});

describe("uvStability", () => {
  it("polyurethane best uv stability", () => {
    expect(uvStability("polyurethane_aliphatic_uv")).toBeGreaterThan(uvStability("epoxy_two_part_chemical"));
  });
});

describe("thickness", () => {
  it("ceramic thickest", () => {
    expect(thickness("ceramic_thermal_spray")).toBeGreaterThan(thickness("fluoropolymer_ptfe_nonstick"));
  });
});

describe("coCost", () => {
  it("ceramic most expensive", () => {
    expect(coCost("ceramic_thermal_spray")).toBeGreaterThan(coCost("epoxy_two_part_chemical"));
  });
});

describe("twoComponent", () => {
  it("epoxy is two component", () => {
    expect(twoComponent("epoxy_two_part_chemical")).toBe(true);
  });
  it("ceramic not two component", () => {
    expect(twoComponent("ceramic_thermal_spray")).toBe(false);
  });
});

describe("forSteel", () => {
  it("zinc rich for steel", () => {
    expect(forSteel("zinc_rich_galvanic_primer")).toBe(true);
  });
  it("fluoropolymer not for steel", () => {
    expect(forSteel("fluoropolymer_ptfe_nonstick")).toBe(false);
  });
});

describe("application", () => {
  it("ceramic uses plasma hvof", () => {
    expect(application("ceramic_thermal_spray")).toBe("plasma_hvof_thermal_gun_spray");
  });
});

describe("bestUse", () => {
  it("epoxy for tank lining floor", () => {
    expect(bestUse("epoxy_two_part_chemical")).toBe("tank_lining_floor_pipe_immersion");
  });
});

describe("coatingTypes", () => {
  it("returns 5 types", () => {
    expect(coatingTypes()).toHaveLength(5);
  });
});

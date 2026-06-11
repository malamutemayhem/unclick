import { describe, it, expect } from "vitest";
import {
  energy, reaction, durability, deflection,
  fdCost, floating, forBerth, material,
  bestUse, fenderTypes,
} from "../fender-type-calc.js";

describe("energy", () => {
  it("cone fender highest energy", () => {
    expect(energy("cone_fender_super_cone")).toBeGreaterThan(energy("cylindrical_rubber_extruded"));
  });
});

describe("reaction", () => {
  it("cell fender highest reaction", () => {
    expect(reaction("cell_fender_buckling_rubber")).toBeGreaterThan(reaction("pneumatic_yokohama_floating"));
  });
});

describe("durability", () => {
  it("foam filled most durable", () => {
    expect(durability("foam_filled_polyurethane")).toBeGreaterThan(durability("pneumatic_yokohama_floating"));
  });
});

describe("deflection", () => {
  it("pneumatic most deflection", () => {
    expect(deflection("pneumatic_yokohama_floating")).toBeGreaterThan(deflection("cylindrical_rubber_extruded"));
  });
});

describe("fdCost", () => {
  it("foam filled most expensive", () => {
    expect(fdCost("foam_filled_polyurethane")).toBeGreaterThan(fdCost("cylindrical_rubber_extruded"));
  });
});

describe("floating", () => {
  it("pneumatic is floating", () => {
    expect(floating("pneumatic_yokohama_floating")).toBe(true);
  });
  it("cell fender not floating", () => {
    expect(floating("cell_fender_buckling_rubber")).toBe(false);
  });
});

describe("forBerth", () => {
  it("cone fender for berth", () => {
    expect(forBerth("cone_fender_super_cone")).toBe(true);
  });
  it("pneumatic not for berth", () => {
    expect(forBerth("pneumatic_yokohama_floating")).toBe(false);
  });
});

describe("material", () => {
  it("pneumatic uses rubber air filled", () => {
    expect(material("pneumatic_yokohama_floating")).toBe("rubber_air_filled_chain_tire_net");
  });
});

describe("bestUse", () => {
  it("cylindrical for small berth", () => {
    expect(bestUse("cylindrical_rubber_extruded")).toBe("small_berth_tug_workboat_pier");
  });
});

describe("fenderTypes", () => {
  it("returns 5 types", () => {
    expect(fenderTypes()).toHaveLength(5);
  });
});

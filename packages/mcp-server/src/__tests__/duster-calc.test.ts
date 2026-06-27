import { describe, it, expect } from "vitest";
import {
  dustCapture, reachability, gentleness, ecoFriendly,
  dusterCost, washable, reusable, dusterMaterial,
  bestTask, dusters,
} from "../duster-calc.js";

describe("dustCapture", () => {
  it("microfiber bendable best dust capture", () => {
    expect(dustCapture("microfiber_bendable")).toBeGreaterThan(dustCapture("compressed_air_can"));
  });
});

describe("reachability", () => {
  it("microfiber bendable best reachability", () => {
    expect(reachability("microfiber_bendable")).toBeGreaterThan(reachability("feather_ostrich"));
  });
});

describe("gentleness", () => {
  it("feather ostrich most gentle", () => {
    expect(gentleness("feather_ostrich")).toBeGreaterThan(gentleness("compressed_air_can"));
  });
});

describe("ecoFriendly", () => {
  it("lambswool static most eco friendly", () => {
    expect(ecoFriendly("lambswool_static")).toBeGreaterThan(ecoFriendly("compressed_air_can"));
  });
});

describe("dusterCost", () => {
  it("feather ostrich most expensive", () => {
    expect(dusterCost("feather_ostrich")).toBeGreaterThan(dusterCost("electrostatic_disposable"));
  });
});

describe("washable", () => {
  it("microfiber bendable is washable", () => {
    expect(washable("microfiber_bendable")).toBe(true);
  });
  it("lambswool static is not", () => {
    expect(washable("lambswool_static")).toBe(false);
  });
});

describe("reusable", () => {
  it("lambswool static is reusable", () => {
    expect(reusable("lambswool_static")).toBe(true);
  });
  it("electrostatic disposable is not", () => {
    expect(reusable("electrostatic_disposable")).toBe(false);
  });
});

describe("dusterMaterial", () => {
  it("feather ostrich uses genuine ostrich plume", () => {
    expect(dusterMaterial("feather_ostrich")).toBe("genuine_ostrich_plume");
  });
});

describe("bestTask", () => {
  it("compressed air can best for keyboard electronics vent", () => {
    expect(bestTask("compressed_air_can")).toBe("keyboard_electronics_vent");
  });
});

describe("dusters", () => {
  it("returns 5 types", () => {
    expect(dusters()).toHaveLength(5);
  });
});

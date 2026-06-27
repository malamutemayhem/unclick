import { describe, it, expect } from "vitest";
import {
  durability, aesthetic, chemical, thickness,
  efCost, decorative, forIndustrial, system,
  bestUse, epoxyFloorTypes,
} from "../epoxy-floor-calc.js";

describe("durability", () => {
  it("mortar most durable", () => {
    expect(durability("mortar_trowel_applied")).toBeGreaterThan(durability("flake_broadcast_chip"));
  });
});

describe("aesthetic", () => {
  it("metallic best aesthetic", () => {
    expect(aesthetic("metallic_swirl_design")).toBeGreaterThan(aesthetic("mortar_trowel_applied"));
  });
});

describe("chemical", () => {
  it("mortar best chemical resistance", () => {
    expect(chemical("mortar_trowel_applied")).toBeGreaterThan(chemical("flake_broadcast_chip"));
  });
});

describe("thickness", () => {
  it("mortar thickest", () => {
    expect(thickness("mortar_trowel_applied")).toBeGreaterThan(thickness("flake_broadcast_chip"));
  });
});

describe("efCost", () => {
  it("mortar most expensive", () => {
    expect(efCost("mortar_trowel_applied")).toBeGreaterThan(efCost("flake_broadcast_chip"));
  });
});

describe("decorative", () => {
  it("metallic is decorative", () => {
    expect(decorative("metallic_swirl_design")).toBe(true);
  });
  it("self leveling not decorative", () => {
    expect(decorative("self_leveling_solid")).toBe(false);
  });
});

describe("forIndustrial", () => {
  it("mortar for industrial", () => {
    expect(forIndustrial("mortar_trowel_applied")).toBe(true);
  });
  it("metallic not industrial", () => {
    expect(forIndustrial("metallic_swirl_design")).toBe(false);
  });
});

describe("system", () => {
  it("quartz uses sand broadcast", () => {
    expect(system("quartz_aggregate_slip")).toBe("quartz_sand_broadcast_texture");
  });
});

describe("bestUse", () => {
  it("metallic for retail lobby", () => {
    expect(bestUse("metallic_swirl_design")).toBe("retail_lobby_designer_floor");
  });
});

describe("epoxyFloorTypes", () => {
  it("returns 5 types", () => {
    expect(epoxyFloorTypes()).toHaveLength(5);
  });
});

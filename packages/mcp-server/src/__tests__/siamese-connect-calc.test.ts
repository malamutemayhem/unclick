import { describe, it, expect } from "vitest";
import {
  accessibility, durability, capacity, aesthetic,
  scCost, frostProof, forHighRise, inlet,
  bestUse, siameseConnectTypes,
} from "../siamese-connect-calc.js";

describe("accessibility", () => {
  it("freestanding most accessible", () => {
    expect(accessibility("freestanding_post_two")).toBeGreaterThan(accessibility("underground_pit_vault"));
  });
});

describe("durability", () => {
  it("underground most durable", () => {
    expect(durability("underground_pit_vault")).toBeGreaterThan(durability("clapper_check_swivel"));
  });
});

describe("capacity", () => {
  it("roof manifold highest capacity", () => {
    expect(capacity("roof_manifold_multi")).toBeGreaterThan(capacity("wall_mount_flush_two"));
  });
});

describe("aesthetic", () => {
  it("underground best aesthetic", () => {
    expect(aesthetic("underground_pit_vault")).toBeGreaterThan(aesthetic("roof_manifold_multi"));
  });
});

describe("scCost", () => {
  it("underground most expensive", () => {
    expect(scCost("underground_pit_vault")).toBeGreaterThan(scCost("clapper_check_swivel"));
  });
});

describe("frostProof", () => {
  it("freestanding is frost proof", () => {
    expect(frostProof("freestanding_post_two")).toBe(true);
  });
  it("wall mount not frost proof", () => {
    expect(frostProof("wall_mount_flush_two")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("roof manifold for high rise", () => {
    expect(forHighRise("roof_manifold_multi")).toBe(true);
  });
  it("wall mount not for high rise", () => {
    expect(forHighRise("wall_mount_flush_two")).toBe(false);
  });
});

describe("inlet", () => {
  it("clapper uses swivel auto drain", () => {
    expect(inlet("clapper_check_swivel")).toBe("swivel_clapper_auto_drain");
  });
});

describe("bestUse", () => {
  it("underground for campus concealed", () => {
    expect(bestUse("underground_pit_vault")).toBe("campus_flush_grade_concealed");
  });
});

describe("siameseConnectTypes", () => {
  it("returns 5 types", () => {
    expect(siameseConnectTypes()).toHaveLength(5);
  });
});

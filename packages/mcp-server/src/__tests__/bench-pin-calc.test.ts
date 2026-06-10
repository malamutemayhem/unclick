import { describe, it, expect } from "vitest";
import {
  holdStability, cutAccess, surfaceArea, durability,
  pinCost, hasClamp, replaceable, pinMaterial,
  bestUse, benchPins,
} from "../bench-pin-calc.js";

describe("holdStability", () => {
  it("multi slot pro most stable hold", () => {
    expect(holdStability("multi_slot_pro")).toBeGreaterThan(holdStability("anvil_flat_top"));
  });
});

describe("cutAccess", () => {
  it("multi slot pro best cut access", () => {
    expect(cutAccess("multi_slot_pro")).toBeGreaterThan(cutAccess("v_slot_standard"));
  });
});

describe("surfaceArea", () => {
  it("anvil flat top most surface area", () => {
    expect(surfaceArea("anvil_flat_top")).toBeGreaterThan(surfaceArea("v_slot_standard"));
  });
});

describe("durability", () => {
  it("anvil flat top most durable", () => {
    expect(durability("anvil_flat_top")).toBeGreaterThan(durability("multi_slot_pro"));
  });
});

describe("pinCost", () => {
  it("multi slot pro most expensive", () => {
    expect(pinCost("multi_slot_pro")).toBeGreaterThan(pinCost("v_slot_standard"));
  });
});

describe("hasClamp", () => {
  it("ring clamp combo has clamp", () => {
    expect(hasClamp("ring_clamp_combo")).toBe(true);
  });
  it("v slot standard no clamp", () => {
    expect(hasClamp("v_slot_standard")).toBe(false);
  });
});

describe("replaceable", () => {
  it("v slot standard is replaceable", () => {
    expect(replaceable("v_slot_standard")).toBe(true);
  });
  it("ring clamp combo not replaceable", () => {
    expect(replaceable("ring_clamp_combo")).toBe(false);
  });
});

describe("pinMaterial", () => {
  it("v slot standard uses hardwood maple block", () => {
    expect(pinMaterial("v_slot_standard")).toBe("hardwood_maple_block");
  });
});

describe("bestUse", () => {
  it("anvil flat top best for hammering flat work", () => {
    expect(bestUse("anvil_flat_top")).toBe("hammering_flat_work");
  });
});

describe("benchPins", () => {
  it("returns 5 types", () => {
    expect(benchPins()).toHaveLength(5);
  });
});

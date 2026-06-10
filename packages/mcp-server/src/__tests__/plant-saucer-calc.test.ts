import { describe, it, expect } from "vitest";
import {
  waterCapacity, aesthetics, durability, surfaceProtect,
  saucerCost, leakProof, selfWatering, saucerMaterial,
  bestUse, plantSaucers,
} from "../plant-saucer-calc.js";

describe("waterCapacity", () => {
  it("self watering reservoir most water capacity", () => {
    expect(waterCapacity("self_watering_reservoir")).toBeGreaterThan(waterCapacity("clear_vinyl_drip_tray"));
  });
});

describe("aesthetics", () => {
  it("ceramic glazed decorative best aesthetics", () => {
    expect(aesthetics("ceramic_glazed_decorative")).toBeGreaterThan(aesthetics("plastic_round_basic"));
  });
});

describe("durability", () => {
  it("self watering reservoir most durable", () => {
    expect(durability("self_watering_reservoir")).toBeGreaterThan(durability("terra_cotta_natural"));
  });
});

describe("surfaceProtect", () => {
  it("clear vinyl drip tray best surface protect", () => {
    expect(surfaceProtect("clear_vinyl_drip_tray")).toBeGreaterThan(surfaceProtect("terra_cotta_natural"));
  });
});

describe("saucerCost", () => {
  it("ceramic glazed decorative most expensive", () => {
    expect(saucerCost("ceramic_glazed_decorative")).toBeGreaterThan(saucerCost("plastic_round_basic"));
  });
});

describe("leakProof", () => {
  it("plastic round basic is leak proof", () => {
    expect(leakProof("plastic_round_basic")).toBe(true);
  });
  it("terra cotta natural is not leak proof", () => {
    expect(leakProof("terra_cotta_natural")).toBe(false);
  });
});

describe("selfWatering", () => {
  it("self watering reservoir is self watering", () => {
    expect(selfWatering("self_watering_reservoir")).toBe(true);
  });
  it("ceramic glazed decorative is not self watering", () => {
    expect(selfWatering("ceramic_glazed_decorative")).toBe(false);
  });
});

describe("saucerMaterial", () => {
  it("terra cotta natural uses unglazed clay earthen", () => {
    expect(saucerMaterial("terra_cotta_natural")).toBe("unglazed_clay_earthen");
  });
});

describe("bestUse", () => {
  it("self watering reservoir best for vacation auto water", () => {
    expect(bestUse("self_watering_reservoir")).toBe("vacation_auto_water");
  });
});

describe("plantSaucers", () => {
  it("returns 5 types", () => {
    expect(plantSaucers()).toHaveLength(5);
  });
});

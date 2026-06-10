import { describe, it, expect } from "vitest";
import {
  cuttingPrecision, productionSpeed, materialVersatility, setupTime,
  equipmentCost, requiresPhysicalDie, contactlessCut, cuttingMechanism,
  bestProduct, dieCuttings,
} from "../die-cutting-calc.js";

describe("cuttingPrecision", () => {
  it("laser most precise cutting", () => {
    expect(cuttingPrecision("laser")).toBeGreaterThan(cuttingPrecision("steel_rule"));
  });
});

describe("productionSpeed", () => {
  it("rotary fastest production", () => {
    expect(productionSpeed("rotary")).toBeGreaterThan(productionSpeed("laser"));
  });
});

describe("materialVersatility", () => {
  it("laser most versatile material", () => {
    expect(materialVersatility("laser")).toBeGreaterThan(materialVersatility("digital"));
  });
});

describe("setupTime", () => {
  it("digital shortest setup", () => {
    expect(setupTime("digital")).toBeLessThan(setupTime("rotary"));
  });
});

describe("equipmentCost", () => {
  it("laser most expensive equipment", () => {
    expect(equipmentCost("laser")).toBeGreaterThan(equipmentCost("steel_rule"));
  });
});

describe("requiresPhysicalDie", () => {
  it("flatbed requires physical die", () => {
    expect(requiresPhysicalDie("flatbed")).toBe(true);
  });
  it("laser does not", () => {
    expect(requiresPhysicalDie("laser")).toBe(false);
  });
});

describe("contactlessCut", () => {
  it("laser is contactless", () => {
    expect(contactlessCut("laser")).toBe(true);
  });
  it("rotary is not", () => {
    expect(contactlessCut("rotary")).toBe(false);
  });
});

describe("cuttingMechanism", () => {
  it("laser uses focused beam vaporization", () => {
    expect(cuttingMechanism("laser")).toBe("focused_beam_vaporization");
  });
});

describe("bestProduct", () => {
  it("rotary for high volume label tag", () => {
    expect(bestProduct("rotary")).toBe("high_volume_label_tag");
  });
});

describe("dieCuttings", () => {
  it("returns 5 cutting types", () => {
    expect(dieCuttings()).toHaveLength(5);
  });
});

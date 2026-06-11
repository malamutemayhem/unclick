import { describe, it, expect } from "vitest";
import {
  speed, quality, durability, colorRange,
  tpCost, ribbonFree, forLabel, method,
  bestUse, thermalPrintTypes,
} from "../thermal-print-type-calc.js";

describe("speed", () => {
  it("direct thermal fastest", () => {
    expect(speed("direct_thermal_receipt")).toBeGreaterThan(speed("retransfer_card_edge"));
  });
});

describe("quality", () => {
  it("dye sub best quality", () => {
    expect(quality("dye_sublimation_photo")).toBeGreaterThan(quality("direct_thermal_receipt"));
  });
});

describe("durability", () => {
  it("retransfer most durable", () => {
    expect(durability("retransfer_card_edge")).toBeGreaterThan(durability("direct_thermal_receipt"));
  });
});

describe("colorRange", () => {
  it("dye sub widest color range", () => {
    expect(colorRange("dye_sublimation_photo")).toBeGreaterThan(colorRange("direct_thermal_receipt"));
  });
});

describe("tpCost", () => {
  it("retransfer most expensive", () => {
    expect(tpCost("retransfer_card_edge")).toBeGreaterThan(tpCost("direct_thermal_receipt"));
  });
});

describe("ribbonFree", () => {
  it("direct thermal is ribbon free", () => {
    expect(ribbonFree("direct_thermal_receipt")).toBe(true);
  });
  it("thermal transfer not ribbon free", () => {
    expect(ribbonFree("thermal_transfer_ribbon")).toBe(false);
  });
});

describe("forLabel", () => {
  it("thermal transfer for label", () => {
    expect(forLabel("thermal_transfer_ribbon")).toBe(true);
  });
  it("dye sub not for label", () => {
    expect(forLabel("dye_sublimation_photo")).toBe(false);
  });
});

describe("method", () => {
  it("dye sub uses vaporize diffuse", () => {
    expect(method("dye_sublimation_photo")).toBe("dye_vaporize_diffuse_into_coat");
  });
});

describe("bestUse", () => {
  it("direct thermal for receipt", () => {
    expect(bestUse("direct_thermal_receipt")).toBe("receipt_shipping_label_short_life");
  });
});

describe("thermalPrintTypes", () => {
  it("returns 5 types", () => {
    expect(thermalPrintTypes()).toHaveLength(5);
  });
});

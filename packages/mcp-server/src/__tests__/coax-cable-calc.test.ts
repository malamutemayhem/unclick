import { describe, it, expect } from "vitest";
import {
  bandwidth, loss, power, flexibility,
  cxCost, lowLoss, forRf, shield,
  bestUse, coaxCableTypes,
} from "../coax-cable-calc.js";

describe("bandwidth", () => {
  it("semi rigid highest bandwidth", () => {
    expect(bandwidth("semi_rigid_copper_tube")).toBeGreaterThan(bandwidth("rg58_50ohm_thin"));
  });
});

describe("loss", () => {
  it("semi rigid lowest loss", () => {
    expect(loss("semi_rigid_copper_tube")).toBeGreaterThan(loss("rg58_50ohm_thin"));
  });
});

describe("power", () => {
  it("semi rigid highest power", () => {
    expect(power("semi_rigid_copper_tube")).toBeGreaterThan(power("rg58_50ohm_thin"));
  });
});

describe("flexibility", () => {
  it("rg58 most flexible", () => {
    expect(flexibility("rg58_50ohm_thin")).toBeGreaterThan(flexibility("semi_rigid_copper_tube"));
  });
});

describe("cxCost", () => {
  it("semi rigid most expensive", () => {
    expect(cxCost("semi_rigid_copper_tube")).toBeGreaterThan(cxCost("rg58_50ohm_thin"));
  });
});

describe("lowLoss", () => {
  it("lmr400 is low loss", () => {
    expect(lowLoss("lmr400_low_loss")).toBe(true);
  });
  it("rg58 not low loss", () => {
    expect(lowLoss("rg58_50ohm_thin")).toBe(false);
  });
});

describe("forRf", () => {
  it("lmr400 for rf", () => {
    expect(forRf("lmr400_low_loss")).toBe(true);
  });
  it("rg6 not for rf", () => {
    expect(forRf("rg6_75ohm_catv")).toBe(false);
  });
});

describe("shield", () => {
  it("semi rigid uses solid copper", () => {
    expect(shield("semi_rigid_copper_tube")).toBe("solid_copper_outer_conductor");
  });
});

describe("bestUse", () => {
  it("rg6 for cable tv", () => {
    expect(bestUse("rg6_75ohm_catv")).toBe("cable_tv_satellite_video_cctv");
  });
});

describe("coaxCableTypes", () => {
  it("returns 5 types", () => {
    expect(coaxCableTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  trackingAbility, outputLevel, detailResolution, complianceFlex,
  cartridgeCost, userReplaceable, needsPreamp, stylusType,
  bestSetup, phonoCartridges,
} from "../phono-cartridge-calc.js";

describe("trackingAbility", () => {
  it("moving coil low best tracking", () => {
    expect(trackingAbility("moving_coil_low")).toBeGreaterThan(trackingAbility("ceramic_crystal"));
  });
});

describe("outputLevel", () => {
  it("ceramic crystal highest output", () => {
    expect(outputLevel("ceramic_crystal")).toBeGreaterThan(outputLevel("moving_coil_low"));
  });
});

describe("detailResolution", () => {
  it("moving coil low best detail", () => {
    expect(detailResolution("moving_coil_low")).toBeGreaterThan(detailResolution("moving_magnet"));
  });
});

describe("complianceFlex", () => {
  it("ceramic crystal most compliant", () => {
    expect(complianceFlex("ceramic_crystal")).toBeGreaterThan(complianceFlex("moving_coil_low"));
  });
});

describe("cartridgeCost", () => {
  it("moving coil low most expensive", () => {
    expect(cartridgeCost("moving_coil_low")).toBeGreaterThan(cartridgeCost("ceramic_crystal"));
  });
});

describe("userReplaceable", () => {
  it("moving magnet is user replaceable", () => {
    expect(userReplaceable("moving_magnet")).toBe(true);
  });
  it("moving coil low is not", () => {
    expect(userReplaceable("moving_coil_low")).toBe(false);
  });
});

describe("needsPreamp", () => {
  it("moving magnet needs preamp", () => {
    expect(needsPreamp("moving_magnet")).toBe(true);
  });
  it("ceramic crystal does not", () => {
    expect(needsPreamp("ceramic_crystal")).toBe(false);
  });
});

describe("stylusType", () => {
  it("moving coil low uses micro ridge nude diamond", () => {
    expect(stylusType("moving_coil_low")).toBe("micro_ridge_nude_diamond");
  });
});

describe("bestSetup", () => {
  it("moving coil low for audiophile reference", () => {
    expect(bestSetup("moving_coil_low")).toBe("audiophile_reference");
  });
});

describe("phonoCartridges", () => {
  it("returns 5 types", () => {
    expect(phonoCartridges()).toHaveLength(5);
  });
});

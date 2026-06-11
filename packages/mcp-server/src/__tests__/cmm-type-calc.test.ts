import { describe, it, expect } from "vitest";
import {
  accuracy, speed, volume, portability,
  cmCost, nonContact, forShopFloor, probe,
  bestUse, cmmTypeCalcTypes,
} from "../cmm-type-calc.js";

describe("accuracy", () => {
  it("bridge gantry most accurate", () => {
    expect(accuracy("bridge_gantry_large")).toBeGreaterThan(accuracy("portable_arm_faro"));
  });
});

describe("speed", () => {
  it("optical CMM fastest", () => {
    expect(speed("optical_cmm_structured_light")).toBeGreaterThan(speed("portable_arm_faro"));
  });
});

describe("volume", () => {
  it("horizontal arm largest volume", () => {
    expect(volume("horizontal_arm_auto")).toBeGreaterThan(volume("cantilever_small_part"));
  });
});

describe("portability", () => {
  it("portable arm most portable", () => {
    expect(portability("portable_arm_faro")).toBeGreaterThan(portability("bridge_gantry_large"));
  });
});

describe("cmCost", () => {
  it("bridge gantry most expensive", () => {
    expect(cmCost("bridge_gantry_large")).toBeGreaterThan(cmCost("portable_arm_faro"));
  });
});

describe("nonContact", () => {
  it("optical CMM is non-contact", () => {
    expect(nonContact("optical_cmm_structured_light")).toBe(true);
  });
  it("bridge gantry is contact", () => {
    expect(nonContact("bridge_gantry_large")).toBe(false);
  });
});

describe("forShopFloor", () => {
  it("portable arm for shop floor", () => {
    expect(forShopFloor("portable_arm_faro")).toBe(true);
  });
  it("bridge gantry not for shop floor", () => {
    expect(forShopFloor("bridge_gantry_large")).toBe(false);
  });
});

describe("probe", () => {
  it("optical uses structured light fringe", () => {
    expect(probe("optical_cmm_structured_light")).toBe("structured_light_fringe_camera");
  });
});

describe("bestUse", () => {
  it("portable arm for field inspection", () => {
    expect(bestUse("portable_arm_faro")).toBe("field_inspection_jig_fixture_check");
  });
});

describe("cmmTypeCalcTypes", () => {
  it("returns 5 types", () => {
    expect(cmmTypeCalcTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  loadRange, throughput, wearMeasure, frictionRes,
  trCost, reciprocating, forLubricant, tribConfig,
  bestUse, tribometerTypes,
} from "../tribometer-calc.js";

describe("loadRange", () => {
  it("block on ring best load range", () => {
    expect(loadRange("block_on_ring")).toBeGreaterThan(loadRange("fretting_trib"));
  });
});

describe("throughput", () => {
  it("four ball highest throughput", () => {
    expect(throughput("four_ball_test")).toBeGreaterThan(throughput("fretting_trib"));
  });
});

describe("wearMeasure", () => {
  it("fretting best wear measure", () => {
    expect(wearMeasure("fretting_trib")).toBeGreaterThan(wearMeasure("four_ball_test"));
  });
});

describe("frictionRes", () => {
  it("fretting best friction resolution", () => {
    expect(frictionRes("fretting_trib")).toBeGreaterThan(frictionRes("four_ball_test"));
  });
});

describe("trCost", () => {
  it("fretting most expensive", () => {
    expect(trCost("fretting_trib")).toBeGreaterThan(trCost("four_ball_test"));
  });
});

describe("reciprocating", () => {
  it("ball on flat is reciprocating", () => {
    expect(reciprocating("ball_on_flat")).toBe(true);
  });
  it("pin on disc not reciprocating", () => {
    expect(reciprocating("pin_on_disc")).toBe(false);
  });
});

describe("forLubricant", () => {
  it("four ball for lubricant", () => {
    expect(forLubricant("four_ball_test")).toBe(true);
  });
  it("pin on disc not for lubricant", () => {
    expect(forLubricant("pin_on_disc")).toBe(false);
  });
});

describe("tribConfig", () => {
  it("block on ring uses high load conforming contact bearing", () => {
    expect(tribConfig("block_on_ring")).toBe("block_on_ring_tribometer_high_load_conforming_contact_bearing");
  });
});

describe("bestUse", () => {
  it("pin on disc for coating wear standard astm g99 test", () => {
    expect(bestUse("pin_on_disc")).toBe("coating_wear_pin_on_disc_tribometer_standard_astm_g99_test");
  });
});

describe("tribometerTypes", () => {
  it("returns 5 types", () => {
    expect(tribometerTypes()).toHaveLength(5);
  });
});

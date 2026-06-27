import { describe, it, expect } from "vitest";
import {
  sensitivity, frequency, selfNoise, durability,
  mcCost, phantomPower, forLive, transducer,
  bestUse, microphoneTypes,
} from "../microphone-type-calc.js";

describe("sensitivity", () => {
  it("condenser most sensitive", () => {
    expect(sensitivity("condenser_large_diaphragm")).toBeGreaterThan(sensitivity("dynamic_moving_coil"));
  });
});

describe("frequency", () => {
  it("condenser widest frequency", () => {
    expect(frequency("condenser_large_diaphragm")).toBeGreaterThan(frequency("dynamic_moving_coil"));
  });
});

describe("selfNoise", () => {
  it("dynamic lowest self noise score highest", () => {
    expect(selfNoise("dynamic_moving_coil")).toBeGreaterThan(selfNoise("condenser_large_diaphragm"));
  });
});

describe("durability", () => {
  it("dynamic most durable", () => {
    expect(durability("dynamic_moving_coil")).toBeGreaterThan(durability("ribbon_velocity_gradient"));
  });
});

describe("mcCost", () => {
  it("ribbon most expensive", () => {
    expect(mcCost("ribbon_velocity_gradient")).toBeGreaterThan(mcCost("electret_mems_miniature"));
  });
});

describe("phantomPower", () => {
  it("condenser needs phantom power", () => {
    expect(phantomPower("condenser_large_diaphragm")).toBe(true);
  });
  it("dynamic no phantom power", () => {
    expect(phantomPower("dynamic_moving_coil")).toBe(false);
  });
});

describe("forLive", () => {
  it("dynamic for live", () => {
    expect(forLive("dynamic_moving_coil")).toBe(true);
  });
  it("condenser not for live", () => {
    expect(forLive("condenser_large_diaphragm")).toBe(false);
  });
});

describe("transducer", () => {
  it("ribbon uses thin metal ribbon", () => {
    expect(transducer("ribbon_velocity_gradient")).toBe("thin_metal_ribbon_magnetic");
  });
});

describe("bestUse", () => {
  it("electret for lavalier headset", () => {
    expect(bestUse("electret_mems_miniature")).toBe("lavalier_phone_headset_iot");
  });
});

describe("microphoneTypes", () => {
  it("returns 5 types", () => {
    expect(microphoneTypes()).toHaveLength(5);
  });
});

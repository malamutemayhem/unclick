import { describe, it, expect } from "vitest";
import {
  accuracy, readSpeed, easeOfUse, childAppeal,
  thermCost, needsBattery, waterproof, sensorType,
  bestUse, bathThermometers,
} from "../bath-thermometer-calc.js";

describe("accuracy", () => {
  it("infrared gun instant most accurate", () => {
    expect(accuracy("infrared_gun_instant")).toBeGreaterThan(accuracy("color_change_card"));
  });
});

describe("readSpeed", () => {
  it("infrared gun instant fastest read speed", () => {
    expect(readSpeed("infrared_gun_instant")).toBeGreaterThan(readSpeed("floating_duck_toy"));
  });
});

describe("easeOfUse", () => {
  it("color change card easiest to use", () => {
    expect(easeOfUse("color_change_card")).toBeGreaterThan(easeOfUse("faucet_mount_inline"));
  });
});

describe("childAppeal", () => {
  it("floating duck toy most child appeal", () => {
    expect(childAppeal("floating_duck_toy")).toBeGreaterThan(childAppeal("infrared_gun_instant"));
  });
});

describe("thermCost", () => {
  it("infrared gun instant most expensive", () => {
    expect(thermCost("infrared_gun_instant")).toBeGreaterThan(thermCost("floating_duck_toy"));
  });
});

describe("needsBattery", () => {
  it("digital strip stick needs battery", () => {
    expect(needsBattery("digital_strip_stick")).toBe(true);
  });
  it("color change card does not need battery", () => {
    expect(needsBattery("color_change_card")).toBe(false);
  });
});

describe("waterproof", () => {
  it("floating duck toy is waterproof", () => {
    expect(waterproof("floating_duck_toy")).toBe(true);
  });
  it("infrared gun instant is not waterproof", () => {
    expect(waterproof("infrared_gun_instant")).toBe(false);
  });
});

describe("sensorType", () => {
  it("infrared gun instant uses ir pyrometer lens", () => {
    expect(sensorType("infrared_gun_instant")).toBe("ir_pyrometer_lens");
  });
});

describe("bestUse", () => {
  it("floating duck toy best for baby bath safe fun", () => {
    expect(bestUse("floating_duck_toy")).toBe("baby_bath_safe_fun");
  });
});

describe("bathThermometers", () => {
  it("returns 5 types", () => {
    expect(bathThermometers()).toHaveLength(5);
  });
});

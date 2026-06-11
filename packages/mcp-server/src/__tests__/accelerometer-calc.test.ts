import { describe, it, expect } from "vitest";
import {
  sensitivity, bandwidth, noiseFloor, powerDraw,
  accelCost, digital, triAxis, sensingMethod,
  bestUse, accelerometers,
} from "../accelerometer-calc.js";

describe("sensitivity", () => {
  it("capacitive low g most sensitive", () => {
    expect(sensitivity("capacitive_low_g")).toBeGreaterThan(sensitivity("analog_single_axis"));
  });
});

describe("bandwidth", () => {
  it("piezo high freq widest bandwidth", () => {
    expect(bandwidth("piezo_high_freq")).toBeGreaterThan(bandwidth("capacitive_low_g"));
  });
});

describe("noiseFloor", () => {
  it("capacitive low g lowest noise floor", () => {
    expect(noiseFloor("capacitive_low_g")).toBeGreaterThan(noiseFloor("piezo_high_freq"));
  });
});

describe("powerDraw", () => {
  it("analog single axis lowest power draw", () => {
    expect(powerDraw("analog_single_axis")).toBeGreaterThan(powerDraw("piezo_high_freq"));
  });
});

describe("accelCost", () => {
  it("piezo high freq most expensive", () => {
    expect(accelCost("piezo_high_freq")).toBeGreaterThan(accelCost("analog_single_axis"));
  });
});

describe("digital", () => {
  it("mems 3axis basic is digital", () => {
    expect(digital("mems_3axis_basic")).toBe(true);
  });
  it("piezo high freq not digital", () => {
    expect(digital("piezo_high_freq")).toBe(false);
  });
});

describe("triAxis", () => {
  it("mems 3axis basic is tri axis", () => {
    expect(triAxis("mems_3axis_basic")).toBe(true);
  });
  it("piezo high freq not tri axis", () => {
    expect(triAxis("piezo_high_freq")).toBe(false);
  });
});

describe("sensingMethod", () => {
  it("capacitive low g uses bulk micromachined cap", () => {
    expect(sensingMethod("capacitive_low_g")).toBe("bulk_micromachined_cap");
  });
});

describe("bestUse", () => {
  it("piezo high freq best for vibration high freq", () => {
    expect(bestUse("piezo_high_freq")).toBe("vibration_high_freq");
  });
});

describe("accelerometers", () => {
  it("returns 5 types", () => {
    expect(accelerometers()).toHaveLength(5);
  });
});

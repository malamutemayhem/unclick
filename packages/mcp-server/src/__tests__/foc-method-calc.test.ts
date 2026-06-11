import { describe, it, expect } from "vitest";
import {
  torqueRipple, efficiency, dynamicResp, complexity,
  focCost, sensorless, forHighSpeed, technique,
  bestUse, focMethods,
} from "../foc-method-calc.js";

describe("torqueRipple", () => {
  it("sinusoidal foc lowest torque ripple", () => {
    expect(torqueRipple("sinusoidal_foc")).toBeGreaterThan(torqueRipple("dtc_direct_torque"));
  });
});

describe("efficiency", () => {
  it("mtpa maximum torque highest efficiency", () => {
    expect(efficiency("mtpa_maximum_torque")).toBeGreaterThan(efficiency("dtc_direct_torque"));
  });
});

describe("dynamicResp", () => {
  it("dtc direct torque best dynamic response", () => {
    expect(dynamicResp("dtc_direct_torque")).toBeGreaterThan(dynamicResp("sensorless_bemf"));
  });
});

describe("complexity", () => {
  it("mtpa maximum torque most complex", () => {
    expect(complexity("mtpa_maximum_torque")).toBeGreaterThan(complexity("sensorless_bemf"));
  });
});

describe("focCost", () => {
  it("mtpa maximum torque most expensive", () => {
    expect(focCost("mtpa_maximum_torque")).toBeGreaterThan(focCost("sensorless_bemf"));
  });
});

describe("sensorless", () => {
  it("sensorless bemf is sensorless", () => {
    expect(sensorless("sensorless_bemf")).toBe(true);
  });
  it("sinusoidal foc not sensorless", () => {
    expect(sensorless("sinusoidal_foc")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("flux weakening for high speed", () => {
    expect(forHighSpeed("flux_weakening")).toBe(true);
  });
  it("sinusoidal foc not for high speed", () => {
    expect(forHighSpeed("sinusoidal_foc")).toBe(false);
  });
});

describe("technique", () => {
  it("mtpa maximum torque uses reluctance torque optimize", () => {
    expect(technique("mtpa_maximum_torque")).toBe("reluctance_torque_optimize");
  });
});

describe("bestUse", () => {
  it("sensorless bemf best for hvac compressor fan", () => {
    expect(bestUse("sensorless_bemf")).toBe("hvac_compressor_fan");
  });
});

describe("focMethods", () => {
  it("returns 5 types", () => {
    expect(focMethods()).toHaveLength(5);
  });
});

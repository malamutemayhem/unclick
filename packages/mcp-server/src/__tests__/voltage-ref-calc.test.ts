import { describe, it, expect } from "vitest";
import {
  accuracy, tempCoeff, noise, stability,
  vrCost, adjustable, forCalibration, topology,
  bestUse, voltageRefs,
} from "../voltage-ref-calc.js";

describe("accuracy", () => {
  it("buried zener highest accuracy", () => {
    expect(accuracy("buried_zener")).toBeGreaterThan(accuracy("shunt_tl431"));
  });
});

describe("tempCoeff", () => {
  it("buried zener best temp coeff", () => {
    expect(tempCoeff("buried_zener")).toBeGreaterThan(tempCoeff("bandgap_silicon"));
  });
});

describe("noise", () => {
  it("xfet low noise best noise perf", () => {
    expect(noise("xfet_low_noise")).toBeGreaterThan(noise("shunt_tl431"));
  });
});

describe("stability", () => {
  it("buried zener most stable", () => {
    expect(stability("buried_zener")).toBeGreaterThan(stability("shunt_tl431"));
  });
});

describe("vrCost", () => {
  it("buried zener most expensive", () => {
    expect(vrCost("buried_zener")).toBeGreaterThan(vrCost("shunt_tl431"));
  });
});

describe("adjustable", () => {
  it("shunt tl431 is adjustable", () => {
    expect(adjustable("shunt_tl431")).toBe(true);
  });
  it("buried zener not adjustable", () => {
    expect(adjustable("buried_zener")).toBe(false);
  });
});

describe("forCalibration", () => {
  it("buried zener for calibration", () => {
    expect(forCalibration("buried_zener")).toBe(true);
  });
  it("bandgap silicon not for calibration", () => {
    expect(forCalibration("bandgap_silicon")).toBe(false);
  });
});

describe("topology", () => {
  it("xfet uses jfet pinch off delta vgs", () => {
    expect(topology("xfet_low_noise")).toBe("jfet_pinch_off_delta_vgs");
  });
});

describe("bestUse", () => {
  it("shunt tl431 best for smps feedback", () => {
    expect(bestUse("shunt_tl431")).toBe("smps_feedback_opto_loop");
  });
});

describe("voltageRefs", () => {
  it("returns 5 types", () => {
    expect(voltageRefs()).toHaveLength(5);
  });
});

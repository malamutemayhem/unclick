import { describe, it, expect } from "vitest";
import {
  bandwidth, accuracy, cmrr, isolationVoltage,
  ampCost, reinforced, forMotorDrive, coupling,
  bestUse, isolationAmps,
} from "../isolation-amp-calc.js";

describe("bandwidth", () => {
  it("digital isolator highest bandwidth", () => {
    expect(bandwidth("digital_isolator")).toBeGreaterThan(bandwidth("opto_linear"));
  });
});

describe("accuracy", () => {
  it("digital isolator best accuracy", () => {
    expect(accuracy("digital_isolator")).toBeGreaterThan(accuracy("opto_linear"));
  });
});

describe("cmrr", () => {
  it("digital isolator best cmrr", () => {
    expect(cmrr("digital_isolator")).toBeGreaterThan(cmrr("opto_linear"));
  });
});

describe("isolationVoltage", () => {
  it("transformer mod highest isolation voltage", () => {
    expect(isolationVoltage("transformer_mod")).toBeGreaterThan(isolationVoltage("magnetic_giant_mr"));
  });
});

describe("ampCost", () => {
  it("magnetic giant mr most expensive", () => {
    expect(ampCost("magnetic_giant_mr")).toBeGreaterThan(ampCost("opto_linear"));
  });
});

describe("reinforced", () => {
  it("opto linear is reinforced", () => {
    expect(reinforced("opto_linear")).toBe(true);
  });
  it("magnetic giant mr not reinforced", () => {
    expect(reinforced("magnetic_giant_mr")).toBe(false);
  });
});

describe("forMotorDrive", () => {
  it("capacitive sigma is for motor drive", () => {
    expect(forMotorDrive("capacitive_sigma")).toBe(true);
  });
  it("opto linear not for motor drive", () => {
    expect(forMotorDrive("opto_linear")).toBe(false);
  });
});

describe("coupling", () => {
  it("magnetic giant mr uses gmr wheatstone bridge", () => {
    expect(coupling("magnetic_giant_mr")).toBe("gmr_wheatstone_bridge");
  });
});

describe("bestUse", () => {
  it("digital isolator best for gate driver feedback", () => {
    expect(bestUse("digital_isolator")).toBe("gate_driver_feedback");
  });
});

describe("isolationAmps", () => {
  it("returns 5 types", () => {
    expect(isolationAmps()).toHaveLength(5);
  });
});

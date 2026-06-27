import { describe, it, expect } from "vitest";
import {
  accuracy, inputImpedance, cmrr, bandwidth,
  configCost, singleSupply, forSensor, feedbackType,
  bestUse, opAmpConfigs,
} from "../op-amp-config-calc.js";

describe("accuracy", () => {
  it("instrumentation amp best accuracy", () => {
    expect(accuracy("instrumentation_amp")).toBeGreaterThan(accuracy("inverting_gain"));
  });
});

describe("inputImpedance", () => {
  it("non inverting gain best input impedance", () => {
    expect(inputImpedance("non_inverting_gain")).toBeGreaterThan(inputImpedance("transimpedance_tia"));
  });
});

describe("cmrr", () => {
  it("instrumentation amp best cmrr", () => {
    expect(cmrr("instrumentation_amp")).toBeGreaterThan(cmrr("inverting_gain"));
  });
});

describe("bandwidth", () => {
  it("transimpedance tia widest bandwidth", () => {
    expect(bandwidth("transimpedance_tia")).toBeGreaterThan(bandwidth("instrumentation_amp"));
  });
});

describe("configCost", () => {
  it("instrumentation amp most expensive", () => {
    expect(configCost("instrumentation_amp")).toBeGreaterThan(configCost("inverting_gain"));
  });
});

describe("singleSupply", () => {
  it("non inverting gain supports single supply", () => {
    expect(singleSupply("non_inverting_gain")).toBe(true);
  });
  it("inverting gain not single supply", () => {
    expect(singleSupply("inverting_gain")).toBe(false);
  });
});

describe("forSensor", () => {
  it("instrumentation amp is for sensor", () => {
    expect(forSensor("instrumentation_amp")).toBe(true);
  });
  it("inverting gain not for sensor", () => {
    expect(forSensor("inverting_gain")).toBe(false);
  });
});

describe("feedbackType", () => {
  it("instrumentation amp uses three op amp gain", () => {
    expect(feedbackType("instrumentation_amp")).toBe("three_op_amp_gain");
  });
});

describe("bestUse", () => {
  it("transimpedance tia best for photodiode current amp", () => {
    expect(bestUse("transimpedance_tia")).toBe("photodiode_current_amp");
  });
});

describe("opAmpConfigs", () => {
  it("returns 5 types", () => {
    expect(opAmpConfigs()).toHaveLength(5);
  });
});

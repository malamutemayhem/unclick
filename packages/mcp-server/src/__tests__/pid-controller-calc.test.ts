import { describe, it, expect } from "vitest";
import {
  controlAccuracy, responseSpeed, configurability, diagnostics,
  pcCost_, digital, forAdvancedControl, algorithm,
  bestUse, pidControllerTypes,
} from "../pid-controller-calc.js";

describe("controlAccuracy", () => {
  it("multi loop station most accurate", () => {
    expect(controlAccuracy("multi_loop_station")).toBeGreaterThan(controlAccuracy("single_loop_analog"));
  });
});

describe("responseSpeed", () => {
  it("feedforward ratio fastest response", () => {
    expect(responseSpeed("feedforward_ratio")).toBeGreaterThan(responseSpeed("single_loop_digital"));
  });
});

describe("configurability", () => {
  it("multi loop station most configurable", () => {
    expect(configurability("multi_loop_station")).toBeGreaterThan(configurability("single_loop_analog"));
  });
});

describe("diagnostics", () => {
  it("multi loop station best diagnostics", () => {
    expect(diagnostics("multi_loop_station")).toBeGreaterThan(diagnostics("single_loop_analog"));
  });
});

describe("pcCost_", () => {
  it("multi loop station most expensive", () => {
    expect(pcCost_("multi_loop_station")).toBeGreaterThan(pcCost_("single_loop_analog"));
  });
});

describe("digital", () => {
  it("single loop digital is digital", () => {
    expect(digital("single_loop_digital")).toBe(true);
  });
  it("single loop analog not digital", () => {
    expect(digital("single_loop_analog")).toBe(false);
  });
});

describe("forAdvancedControl", () => {
  it("cascade primary sec for advanced control", () => {
    expect(forAdvancedControl("cascade_primary_sec")).toBe(true);
  });
  it("single loop digital not for advanced control", () => {
    expect(forAdvancedControl("single_loop_digital")).toBe(false);
  });
});

describe("algorithm", () => {
  it("feedforward uses ratio trim plus feedback", () => {
    expect(algorithm("feedforward_ratio")).toBe("measured_disturbance_ratio_trim_plus_feedback_pid");
  });
});

describe("bestUse", () => {
  it("cascade for heat exchanger boiler", () => {
    expect(bestUse("cascade_primary_sec")).toBe("heat_exchanger_boiler_drum_level_fast_disturbance");
  });
});

describe("pidControllerTypes", () => {
  it("returns 5 types", () => {
    expect(pidControllerTypes()).toHaveLength(5);
  });
});

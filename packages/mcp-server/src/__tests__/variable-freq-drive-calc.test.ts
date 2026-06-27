import { describe, it, expect } from "vitest";
import {
  efficiency, harmonicDistortion, speedRange, dynamicResponse,
  vfCost, regenerative, forHvac, topology,
  bestUse, variableFreqDriveTypes,
} from "../variable-freq-drive-calc.js";

describe("efficiency", () => {
  it("pwm and multilevel highest efficiency", () => {
    expect(efficiency("pwm_voltage_source")).toBeGreaterThan(efficiency("micro_drive_compact"));
  });
});

describe("harmonicDistortion", () => {
  it("multilevel best harmonic distortion", () => {
    expect(harmonicDistortion("multilevel_medium_v")).toBeGreaterThan(harmonicDistortion("micro_drive_compact"));
  });
});

describe("speedRange", () => {
  it("regenerative widest speed range", () => {
    expect(speedRange("regenerative_4q")).toBeGreaterThan(speedRange("micro_drive_compact"));
  });
});

describe("dynamicResponse", () => {
  it("regenerative best dynamic response", () => {
    expect(dynamicResponse("regenerative_4q")).toBeGreaterThan(dynamicResponse("micro_drive_compact"));
  });
});

describe("vfCost", () => {
  it("multilevel most expensive", () => {
    expect(vfCost("multilevel_medium_v")).toBeGreaterThan(vfCost("micro_drive_compact"));
  });
});

describe("regenerative", () => {
  it("regenerative 4q is regenerative", () => {
    expect(regenerative("regenerative_4q")).toBe(true);
  });
  it("pwm not regenerative", () => {
    expect(regenerative("pwm_voltage_source")).toBe(false);
  });
});

describe("forHvac", () => {
  it("pwm for hvac", () => {
    expect(forHvac("pwm_voltage_source")).toBe(true);
  });
  it("multilevel not for hvac", () => {
    expect(forHvac("multilevel_medium_v")).toBe(false);
  });
});

describe("topology", () => {
  it("current source uses thyristor csi", () => {
    expect(topology("current_source_csi")).toBe("thyristor_current_source_inverter_dc_link");
  });
});

describe("bestUse", () => {
  it("micro drive for oem machine", () => {
    expect(bestUse("micro_drive_compact")).toBe("oem_machine_small_motor_embedded_control_panel");
  });
});

describe("variableFreqDriveTypes", () => {
  it("returns 5 types", () => {
    expect(variableFreqDriveTypes()).toHaveLength(5);
  });
});

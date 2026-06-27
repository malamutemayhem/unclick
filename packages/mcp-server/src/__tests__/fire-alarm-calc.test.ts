import { describe, it, expect } from "vitest";
import {
  sensitivity, falseAlarm, coverage, response,
  faCost, addressable, forSmoke, sensing,
  bestUse, fireAlarmTypes,
} from "../fire-alarm-calc.js";

describe("sensitivity", () => {
  it("aspirating most sensitive", () => {
    expect(sensitivity("aspirating_vesda_sample")).toBeGreaterThan(sensitivity("heat_fixed_temp_rate_rise"));
  });
});

describe("falseAlarm", () => {
  it("heat lowest false alarm", () => {
    expect(falseAlarm("heat_fixed_temp_rate_rise")).toBeGreaterThan(falseAlarm("ionization_smoke_particle"));
  });
});

describe("coverage", () => {
  it("beam detector widest coverage", () => {
    expect(coverage("beam_detector_reflected_ir")).toBeGreaterThan(coverage("ionization_smoke_particle"));
  });
});

describe("response", () => {
  it("aspirating fastest response", () => {
    expect(response("aspirating_vesda_sample")).toBeGreaterThan(response("heat_fixed_temp_rate_rise"));
  });
});

describe("faCost", () => {
  it("aspirating most expensive", () => {
    expect(faCost("aspirating_vesda_sample")).toBeGreaterThan(faCost("ionization_smoke_particle"));
  });
});

describe("addressable", () => {
  it("aspirating is addressable", () => {
    expect(addressable("aspirating_vesda_sample")).toBe(true);
  });
  it("ionization not addressable", () => {
    expect(addressable("ionization_smoke_particle")).toBe(false);
  });
});

describe("forSmoke", () => {
  it("ionization for smoke", () => {
    expect(forSmoke("ionization_smoke_particle")).toBe(true);
  });
  it("heat not for smoke", () => {
    expect(forSmoke("heat_fixed_temp_rate_rise")).toBe(false);
  });
});

describe("sensing", () => {
  it("beam uses infrared reflector", () => {
    expect(sensing("beam_detector_reflected_ir")).toBe("infrared_beam_reflector_obscuration");
  });
});

describe("bestUse", () => {
  it("aspirating for data center", () => {
    expect(bestUse("aspirating_vesda_sample")).toBe("data_center_clean_room_early_warning");
  });
});

describe("fireAlarmTypes", () => {
  it("returns 5 types", () => {
    expect(fireAlarmTypes()).toHaveLength(5);
  });
});

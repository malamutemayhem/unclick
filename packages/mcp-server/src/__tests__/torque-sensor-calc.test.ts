import { describe, it, expect } from "vitest";
import {
  accuracy, bandwidth, overload, rotaryCapable,
  torqCost, contactless, forDyno, principle,
  bestUse, torqueSensors,
} from "../torque-sensor-calc.js";

describe("accuracy", () => {
  it("optical phase shift highest accuracy", () => {
    expect(accuracy("optical_phase_shift")).toBeGreaterThan(accuracy("magnetoelastic_sar"));
  });
});

describe("bandwidth", () => {
  it("optical phase shift widest bandwidth", () => {
    expect(bandwidth("optical_phase_shift")).toBeGreaterThan(bandwidth("reaction_load_cell"));
  });
});

describe("overload", () => {
  it("reaction load cell best overload", () => {
    expect(overload("reaction_load_cell")).toBeGreaterThan(overload("optical_phase_shift"));
  });
});

describe("rotaryCapable", () => {
  it("magnetoelastic sar most rotary capable", () => {
    expect(rotaryCapable("magnetoelastic_sar")).toBeGreaterThan(rotaryCapable("reaction_load_cell"));
  });
});

describe("torqCost", () => {
  it("optical phase shift most expensive", () => {
    expect(torqCost("optical_phase_shift")).toBeGreaterThan(torqCost("reaction_load_cell"));
  });
});

describe("contactless", () => {
  it("magnetoelastic sar is contactless", () => {
    expect(contactless("magnetoelastic_sar")).toBe(true);
  });
  it("strain gauge shaft not contactless", () => {
    expect(contactless("strain_gauge_shaft")).toBe(false);
  });
});

describe("forDyno", () => {
  it("strain gauge shaft for dyno", () => {
    expect(forDyno("strain_gauge_shaft")).toBe(true);
  });
  it("magnetoelastic sar not for dyno", () => {
    expect(forDyno("magnetoelastic_sar")).toBe(false);
  });
});

describe("principle", () => {
  it("magnetoelastic sar uses permeability stress change", () => {
    expect(principle("magnetoelastic_sar")).toBe("permeability_stress_change");
  });
});

describe("bestUse", () => {
  it("reaction load cell best for static torque test stand", () => {
    expect(bestUse("reaction_load_cell")).toBe("static_torque_test_stand");
  });
});

describe("torqueSensors", () => {
  it("returns 5 types", () => {
    expect(torqueSensors()).toHaveLength(5);
  });
});

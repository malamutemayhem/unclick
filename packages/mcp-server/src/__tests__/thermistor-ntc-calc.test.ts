import { describe, it, expect } from "vitest";
import {
  accuracy, response, stability, interchangeability,
  tnCost, linearized, forPrecision, construction,
  bestUse, thermistorNtcTypes,
} from "../thermistor-ntc-calc.js";

describe("accuracy", () => {
  it("probe ntc most accurate", () => {
    expect(accuracy("probe_ntc_immersion")).toBeGreaterThan(accuracy("disc_ntc_power_surge"));
  });
});

describe("response", () => {
  it("bead ntc fastest response", () => {
    expect(response("bead_ntc_fast_response")).toBeGreaterThan(response("disc_ntc_power_surge"));
  });
});

describe("stability", () => {
  it("chip ntc most stable", () => {
    expect(stability("chip_ntc_smd_pcb")).toBeGreaterThan(stability("bead_ntc_fast_response"));
  });
});

describe("interchangeability", () => {
  it("chip ntc best interchangeability", () => {
    expect(interchangeability("chip_ntc_smd_pcb")).toBeGreaterThan(interchangeability("disc_ntc_power_surge"));
  });
});

describe("tnCost", () => {
  it("probe ntc most expensive", () => {
    expect(tnCost("probe_ntc_immersion")).toBeGreaterThan(tnCost("chip_ntc_smd_pcb"));
  });
});

describe("linearized", () => {
  it("probe ntc is linearized", () => {
    expect(linearized("probe_ntc_immersion")).toBe(true);
  });
  it("bead ntc not linearized", () => {
    expect(linearized("bead_ntc_fast_response")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("chip ntc for precision", () => {
    expect(forPrecision("chip_ntc_smd_pcb")).toBe(true);
  });
  it("disc ntc not for precision", () => {
    expect(forPrecision("disc_ntc_power_surge")).toBe(false);
  });
});

describe("construction", () => {
  it("ring lug uses bolt on surface contact", () => {
    expect(construction("ring_lug_ntc_surface")).toBe("ring_terminal_bolt_on_surface_contact");
  });
});

describe("bestUse", () => {
  it("disc ntc for power supply inrush", () => {
    expect(bestUse("disc_ntc_power_surge")).toBe("power_supply_inrush_current_suppress");
  });
});

describe("thermistorNtcTypes", () => {
  it("returns 5 types", () => {
    expect(thermistorNtcTypes()).toHaveLength(5);
  });
});

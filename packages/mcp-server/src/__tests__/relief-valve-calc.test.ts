import { describe, it, expect } from "vitest";
import {
  capacity, accuracy, reseat, reliability,
  rvCost, reclosing, forPressure, element,
  bestUse, reliefValveTypes,
} from "../relief-valve-calc.js";

describe("capacity", () => {
  it("pilot operated highest capacity", () => {
    expect(capacity("pilot_operated_high_cap")).toBeGreaterThan(capacity("thermal_relief_liquid_lock"));
  });
});

describe("accuracy", () => {
  it("pilot operated most accurate", () => {
    expect(accuracy("pilot_operated_high_cap")).toBeGreaterThan(accuracy("thermal_relief_liquid_lock"));
  });
});

describe("reseat", () => {
  it("pilot operated best reseat", () => {
    expect(reseat("pilot_operated_high_cap")).toBeGreaterThan(reseat("rupture_disc_burst_membrane"));
  });
});

describe("reliability", () => {
  it("rupture disc most reliable", () => {
    expect(reliability("rupture_disc_burst_membrane")).toBeGreaterThan(reliability("balanced_bellows_backpressure"));
  });
});

describe("rvCost", () => {
  it("pilot operated most expensive", () => {
    expect(rvCost("pilot_operated_high_cap")).toBeGreaterThan(rvCost("thermal_relief_liquid_lock"));
  });
});

describe("reclosing", () => {
  it("spring loaded is reclosing", () => {
    expect(reclosing("spring_loaded_pop_action")).toBe(true);
  });
  it("rupture disc not reclosing", () => {
    expect(reclosing("rupture_disc_burst_membrane")).toBe(false);
  });
});

describe("forPressure", () => {
  it("spring loaded for pressure", () => {
    expect(forPressure("spring_loaded_pop_action")).toBe(true);
  });
  it("thermal relief not for pressure", () => {
    expect(forPressure("thermal_relief_liquid_lock")).toBe(false);
  });
});

describe("element", () => {
  it("rupture disc uses burst membrane", () => {
    expect(element("rupture_disc_burst_membrane")).toBe("metal_membrane_burst_at_pressure");
  });
});

describe("bestUse", () => {
  it("pilot operated for high capacity pipeline", () => {
    expect(bestUse("pilot_operated_high_cap")).toBe("high_capacity_pipeline_close_set");
  });
});

describe("reliefValveTypes", () => {
  it("returns 5 types", () => {
    expect(reliefValveTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  protection, pressureDrop, flowCapacity, maintenance,
  faCost, detonationRated, forTankVent, element,
  bestUse, flameArresterTypes,
} from "../flame-arrester-calc.js";

describe("protection", () => {
  it("detonation inline highest protection", () => {
    expect(protection("detonation_inline")).toBeGreaterThan(protection("end_of_line_vent"));
  });
});

describe("pressureDrop", () => {
  it("end of line vent best pressure drop", () => {
    expect(pressureDrop("end_of_line_vent")).toBeGreaterThan(pressureDrop("hydraulic_liquid_seal"));
  });
});

describe("flowCapacity", () => {
  it("high velocity vent highest flow capacity", () => {
    expect(flowCapacity("high_velocity_vent")).toBeGreaterThan(flowCapacity("deflagration_inline"));
  });
});

describe("maintenance", () => {
  it("high velocity vent lowest maintenance", () => {
    expect(maintenance("high_velocity_vent")).toBeGreaterThan(maintenance("hydraulic_liquid_seal"));
  });
});

describe("faCost", () => {
  it("detonation inline most expensive", () => {
    expect(faCost("detonation_inline")).toBeGreaterThan(faCost("end_of_line_vent"));
  });
});

describe("detonationRated", () => {
  it("detonation inline is detonation rated", () => {
    expect(detonationRated("detonation_inline")).toBe(true);
  });
  it("deflagration inline not detonation rated", () => {
    expect(detonationRated("deflagration_inline")).toBe(false);
  });
});

describe("forTankVent", () => {
  it("end of line vent for tank vent", () => {
    expect(forTankVent("end_of_line_vent")).toBe(true);
  });
  it("deflagration inline not for tank vent", () => {
    expect(forTankVent("deflagration_inline")).toBe(false);
  });
});

describe("element", () => {
  it("hydraulic liquid seal uses water glycol", () => {
    expect(element("hydraulic_liquid_seal")).toBe("liquid_seal_drum_water_glycol_bubble_quench");
  });
});

describe("bestUse", () => {
  it("detonation inline for flare header", () => {
    expect(bestUse("detonation_inline")).toBe("long_pipe_run_flare_header_detonation_risk");
  });
});

describe("flameArresterTypes", () => {
  it("returns 5 types", () => {
    expect(flameArresterTypes()).toHaveLength(5);
  });
});

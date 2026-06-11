import { describe, it, expect } from "vitest";
import {
  flowCapacity, pressureDrop, protection, maintenance,
  faCost, bidirectional, forTank, element,
  bestUse, flameArrestTypes,
} from "../flame-arrest-calc.js";

describe("flowCapacity", () => {
  it("packed bed highest flow capacity", () => {
    expect(flowCapacity("packed_bed_gravel")).toBeGreaterThan(flowCapacity("hydraulic_liquid_seal"));
  });
});

describe("pressureDrop", () => {
  it("end of line lowest pressure drop", () => {
    expect(pressureDrop("end_of_line_vent")).toBeGreaterThan(pressureDrop("packed_bed_gravel"));
  });
});

describe("protection", () => {
  it("detonation inline highest protection", () => {
    expect(protection("detonation_inline")).toBeGreaterThan(protection("packed_bed_gravel"));
  });
});

describe("maintenance", () => {
  it("end of line easiest maintenance", () => {
    expect(maintenance("end_of_line_vent")).toBeGreaterThan(maintenance("packed_bed_gravel"));
  });
});

describe("faCost", () => {
  it("detonation inline most expensive", () => {
    expect(faCost("detonation_inline")).toBeGreaterThan(faCost("packed_bed_gravel"));
  });
});

describe("bidirectional", () => {
  it("deflagration inline is bidirectional", () => {
    expect(bidirectional("deflagration_inline")).toBe(true);
  });
  it("end of line not bidirectional", () => {
    expect(bidirectional("end_of_line_vent")).toBe(false);
  });
});

describe("forTank", () => {
  it("end of line for tank", () => {
    expect(forTank("end_of_line_vent")).toBe(true);
  });
  it("detonation inline not for tank", () => {
    expect(forTank("detonation_inline")).toBe(false);
  });
});

describe("element", () => {
  it("hydraulic uses liquid glycol seal", () => {
    expect(element("hydraulic_liquid_seal")).toBe("liquid_glycol_water_seal_column");
  });
});

describe("bestUse", () => {
  it("detonation for long pipe run", () => {
    expect(bestUse("detonation_inline")).toBe("long_pipe_run_detonation_risk_high");
  });
});

describe("flameArrestTypes", () => {
  it("returns 5 types", () => {
    expect(flameArrestTypes()).toHaveLength(5);
  });
});

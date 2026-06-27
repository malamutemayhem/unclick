import { describe, it, expect } from "vitest";
import {
  liftCapacity, span, liftSpeed, mobility,
  gcCost, selfPropelled, forContainer, structure,
  bestUse, gantryCraneTypes,
} from "../gantry-crane-calc.js";

describe("liftCapacity", () => {
  it("ship to shore highest lift capacity", () => {
    expect(liftCapacity("ship_to_shore")).toBeGreaterThan(liftCapacity("portable_aluminum"));
  });
});

describe("span", () => {
  it("ship to shore widest span", () => {
    expect(span("ship_to_shore")).toBeGreaterThan(span("portable_aluminum"));
  });
});

describe("liftSpeed", () => {
  it("ship to shore fastest lift speed", () => {
    expect(liftSpeed("ship_to_shore")).toBeGreaterThan(liftSpeed("portable_aluminum"));
  });
});

describe("mobility", () => {
  it("portable aluminum most mobile", () => {
    expect(mobility("portable_aluminum")).toBeGreaterThan(mobility("ship_to_shore"));
  });
});

describe("gcCost", () => {
  it("ship to shore most expensive", () => {
    expect(gcCost("ship_to_shore")).toBeGreaterThan(gcCost("portable_aluminum"));
  });
});

describe("selfPropelled", () => {
  it("rubber tired rtg is self propelled", () => {
    expect(selfPropelled("rubber_tired_rtg")).toBe(true);
  });
  it("portable aluminum not self propelled", () => {
    expect(selfPropelled("portable_aluminum")).toBe(false);
  });
});

describe("forContainer", () => {
  it("ship to shore for containers", () => {
    expect(forContainer("ship_to_shore")).toBe(true);
  });
  it("full gantry rail not for containers", () => {
    expect(forContainer("full_gantry_rail")).toBe(false);
  });
});

describe("structure", () => {
  it("rubber tired rtg uses rubber tire wheels", () => {
    expect(structure("rubber_tired_rtg")).toBe("rubber_tire_wheel_straddle_container_stack_diesel_electric");
  });
});

describe("bestUse", () => {
  it("ship to shore for deep water port", () => {
    expect(bestUse("ship_to_shore")).toBe("deep_water_port_container_vessel_loading_unloading_quayside");
  });
});

describe("gantryCraneTypes", () => {
  it("returns 5 types", () => {
    expect(gantryCraneTypes()).toHaveLength(5);
  });
});

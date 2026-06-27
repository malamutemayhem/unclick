import { describe, it, expect } from "vitest";
import {
  flowCapacity, setPointAccuracy, leakTightness, reliability,
  evCost, pilotOperated, forEmergency, design,
  bestUse, emergencyVentTypes,
} from "../emergency-vent-calc.js";

describe("flowCapacity", () => {
  it("emergency relief vent highest flow capacity", () => {
    expect(flowCapacity("emergency_relief_vent")).toBeGreaterThan(flowCapacity("gauge_hatch_inspect"));
  });
});

describe("setPointAccuracy", () => {
  it("pilot operated best set point accuracy", () => {
    expect(setPointAccuracy("pilot_operated_relief")).toBeGreaterThan(setPointAccuracy("emergency_relief_vent"));
  });
});

describe("leakTightness", () => {
  it("pilot operated best leak tightness", () => {
    expect(leakTightness("pilot_operated_relief")).toBeGreaterThan(leakTightness("emergency_relief_vent"));
  });
});

describe("reliability", () => {
  it("emergency relief vent most reliable", () => {
    expect(reliability("emergency_relief_vent")).toBeGreaterThanOrEqual(reliability("gauge_hatch_inspect"));
  });
});

describe("evCost", () => {
  it("pilot operated most expensive", () => {
    expect(evCost("pilot_operated_relief")).toBeGreaterThan(evCost("gauge_hatch_inspect"));
  });
});

describe("pilotOperated", () => {
  it("pilot operated relief is pilot operated", () => {
    expect(pilotOperated("pilot_operated_relief")).toBe(true);
  });
  it("conservation vent not pilot operated", () => {
    expect(pilotOperated("conservation_vent_pv")).toBe(false);
  });
});

describe("forEmergency", () => {
  it("emergency relief vent for emergency", () => {
    expect(forEmergency("emergency_relief_vent")).toBe(true);
  });
  it("conservation vent not for emergency", () => {
    expect(forEmergency("conservation_vent_pv")).toBe(false);
  });
});

describe("design", () => {
  it("blanketing valve uses snap acting regulator", () => {
    expect(design("blanketing_valve_inert")).toBe("snap_acting_blanketing_regulator_inert_gas_pad");
  });
});

describe("bestUse", () => {
  it("gauge hatch for tank access", () => {
    expect(bestUse("gauge_hatch_inspect")).toBe("tank_gauging_sampling_inspection_access_point");
  });
});

describe("emergencyVentTypes", () => {
  it("returns 5 types", () => {
    expect(emergencyVentTypes()).toHaveLength(5);
  });
});

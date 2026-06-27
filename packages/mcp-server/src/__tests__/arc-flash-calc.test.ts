import { describe, it, expect } from "vitest";
import {
  protection, throughput, hazardReduction, clearanceSpeed,
  afCost, passive, forSwitchgear, flashConfig,
  bestUse, arcFlashTypes,
} from "../arc-flash-calc.js";

describe("protection", () => {
  it("arc resist gear best protection", () => {
    expect(protection("arc_resist_gear")).toBeGreaterThan(protection("incident_energy"));
  });
});

describe("throughput", () => {
  it("bus differential highest throughput", () => {
    expect(throughput("bus_differential")).toBeGreaterThan(throughput("arc_rated_ppe"));
  });
});

describe("hazardReduction", () => {
  it("arc resist gear best hazard reduction", () => {
    expect(hazardReduction("arc_resist_gear")).toBeGreaterThan(hazardReduction("incident_energy"));
  });
});

describe("clearanceSpeed", () => {
  it("bus differential fastest clearance speed", () => {
    expect(clearanceSpeed("bus_differential")).toBeGreaterThan(clearanceSpeed("incident_energy"));
  });
});

describe("afCost", () => {
  it("arc resist gear most expensive", () => {
    expect(afCost("arc_resist_gear")).toBeGreaterThan(afCost("incident_energy"));
  });
});

describe("passive", () => {
  it("incident energy is passive", () => {
    expect(passive("incident_energy")).toBe(true);
  });
  it("bus differential not passive", () => {
    expect(passive("bus_differential")).toBe(false);
  });
});

describe("forSwitchgear", () => {
  it("arc resist gear for switchgear", () => {
    expect(forSwitchgear("arc_resist_gear")).toBe(true);
  });
  it("incident energy not for switchgear", () => {
    expect(forSwitchgear("incident_energy")).toBe(false);
  });
});

describe("flashConfig", () => {
  it("arc resistant switchgear vent redirect contain ieee c37 20 7", () => {
    expect(flashConfig("arc_resist_gear")).toBe("arc_resistant_switchgear_vent_redirect_contain_ieee_c37_20_7");
  });
});

describe("bestUse", () => {
  it("bus differential for switchgear fast clear reduce arc energy", () => {
    expect(bestUse("bus_differential")).toBe("switchgear_bus_differential_relay_fast_clear_reduce_arc_energy");
  });
});

describe("arcFlashTypes", () => {
  it("returns 5 types", () => {
    expect(arcFlashTypes()).toHaveLength(5);
  });
});

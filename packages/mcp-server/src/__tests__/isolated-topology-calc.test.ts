import { describe, it, expect } from "vitest";
import {
  powerRange, efficiency, complexity, emiPerf,
  topoCost, softSwitch, forTelecom, isolation,
  bestUse, isolatedTopologies,
} from "../isolated-topology-calc.js";

describe("powerRange", () => {
  it("full bridge psfb highest power range", () => {
    expect(powerRange("full_bridge_psfb")).toBeGreaterThan(powerRange("flyback_single"));
  });
});

describe("efficiency", () => {
  it("half bridge llc best efficiency", () => {
    expect(efficiency("half_bridge_llc")).toBeGreaterThan(efficiency("flyback_single"));
  });
});

describe("complexity", () => {
  it("full bridge psfb most complex", () => {
    expect(complexity("full_bridge_psfb")).toBeGreaterThan(complexity("flyback_single"));
  });
});

describe("emiPerf", () => {
  it("half bridge llc best emi performance", () => {
    expect(emiPerf("half_bridge_llc")).toBeGreaterThan(emiPerf("flyback_single"));
  });
});

describe("topoCost", () => {
  it("full bridge psfb most expensive", () => {
    expect(topoCost("full_bridge_psfb")).toBeGreaterThan(topoCost("flyback_single"));
  });
});

describe("softSwitch", () => {
  it("half bridge llc has soft switching", () => {
    expect(softSwitch("half_bridge_llc")).toBe(true);
  });
  it("flyback single no soft switching", () => {
    expect(softSwitch("flyback_single")).toBe(false);
  });
});

describe("forTelecom", () => {
  it("half bridge llc is for telecom", () => {
    expect(forTelecom("half_bridge_llc")).toBe(true);
  });
  it("flyback single not for telecom", () => {
    expect(forTelecom("flyback_single")).toBe(false);
  });
});

describe("isolation", () => {
  it("half bridge llc uses resonant tank gain", () => {
    expect(isolation("half_bridge_llc")).toBe("resonant_tank_gain");
  });
});

describe("bestUse", () => {
  it("full bridge psfb best for high power battery charger", () => {
    expect(bestUse("full_bridge_psfb")).toBe("high_power_battery_charger");
  });
});

describe("isolatedTopologies", () => {
  it("returns 5 types", () => {
    expect(isolatedTopologies()).toHaveLength(5);
  });
});

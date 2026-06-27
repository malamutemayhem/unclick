import { describe, it, expect } from "vitest";
import {
  rdsOn, switchSpeed, voltageRating, thermalPerf,
  switchCost, enhancementMode, forHighVoltage, technology,
  bestUse, mosfetSwitches,
} from "../mosfet-switch-calc.js";

describe("rdsOn", () => {
  it("gan hemt power best rds on", () => {
    expect(rdsOn("gan_hemt_power")).toBeGreaterThan(rdsOn("pmos_high_side"));
  });
});

describe("switchSpeed", () => {
  it("gan hemt power fastest switch", () => {
    expect(switchSpeed("gan_hemt_power")).toBeGreaterThan(switchSpeed("pmos_high_side"));
  });
});

describe("voltageRating", () => {
  it("sic mosfet high v highest voltage rating", () => {
    expect(voltageRating("sic_mosfet_high_v")).toBeGreaterThan(voltageRating("nmos_enhance_logic"));
  });
});

describe("thermalPerf", () => {
  it("sic mosfet high v best thermal perf", () => {
    expect(thermalPerf("sic_mosfet_high_v")).toBeGreaterThan(thermalPerf("pmos_high_side"));
  });
});

describe("switchCost", () => {
  it("sic mosfet high v most expensive", () => {
    expect(switchCost("sic_mosfet_high_v")).toBeGreaterThan(switchCost("nmos_enhance_logic"));
  });
});

describe("enhancementMode", () => {
  it("nmos enhance logic is enhancement mode", () => {
    expect(enhancementMode("nmos_enhance_logic")).toBe(true);
  });
});

describe("forHighVoltage", () => {
  it("sic mosfet high v is for high voltage", () => {
    expect(forHighVoltage("sic_mosfet_high_v")).toBe(true);
  });
  it("nmos enhance logic not for high voltage", () => {
    expect(forHighVoltage("nmos_enhance_logic")).toBe(false);
  });
});

describe("technology", () => {
  it("gan hemt power uses gallium nitride hemt", () => {
    expect(technology("gan_hemt_power")).toBe("gallium_nitride_hemt");
  });
});

describe("bestUse", () => {
  it("trench mosfet low r best for high current load switch", () => {
    expect(bestUse("trench_mosfet_low_r")).toBe("high_current_load_switch");
  });
});

describe("mosfetSwitches", () => {
  it("returns 5 types", () => {
    expect(mosfetSwitches()).toHaveLength(5);
  });
});

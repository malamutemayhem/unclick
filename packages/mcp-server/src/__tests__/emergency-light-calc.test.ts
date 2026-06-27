import { describe, it, expect } from "vitest";
import {
  brightness, duration, aesthetic, reliability,
  elCost, selfTest, forHazardous, battery,
  bestUse, emergencyLightTypes,
} from "../emergency-light-calc.js";

describe("brightness", () => {
  it("industrial brightest", () => {
    expect(brightness("industrial_hazardous")).toBeGreaterThan(brightness("combo_exit_emergency"));
  });
});

describe("duration", () => {
  it("remote head longest duration", () => {
    expect(duration("remote_head_central")).toBeGreaterThan(duration("combo_exit_emergency"));
  });
});

describe("aesthetic", () => {
  it("recessed best aesthetic", () => {
    expect(aesthetic("recessed_architectural")).toBeGreaterThan(aesthetic("industrial_hazardous"));
  });
});

describe("reliability", () => {
  it("industrial most reliable", () => {
    expect(reliability("industrial_hazardous")).toBeGreaterThan(reliability("combo_exit_emergency"));
  });
});

describe("elCost", () => {
  it("industrial most expensive", () => {
    expect(elCost("industrial_hazardous")).toBeGreaterThan(elCost("twin_head_battery"));
  });
});

describe("selfTest", () => {
  it("twin head has self test", () => {
    expect(selfTest("twin_head_battery")).toBe(true);
  });
  it("remote head no self test", () => {
    expect(selfTest("remote_head_central")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("industrial for hazardous", () => {
    expect(forHazardous("industrial_hazardous")).toBe(true);
  });
  it("combo not hazardous", () => {
    expect(forHazardous("combo_exit_emergency")).toBe(false);
  });
});

describe("battery", () => {
  it("recessed uses lithium ion", () => {
    expect(battery("recessed_architectural")).toBe("lithium_ion_slim_recessed");
  });
});

describe("bestUse", () => {
  it("remote head for large facility", () => {
    expect(bestUse("remote_head_central")).toBe("large_facility_central_system");
  });
});

describe("emergencyLightTypes", () => {
  it("returns 5 types", () => {
    expect(emergencyLightTypes()).toHaveLength(5);
  });
});

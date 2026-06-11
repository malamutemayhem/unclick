import { describe, it, expect } from "vitest";
import {
  efficiency, thrust, maneuver, cavitation,
  ppCost, variablePitch, forDeepDraft, drive,
  bestUse, propellerTypes,
} from "../propeller-type-calc.js";

describe("efficiency", () => {
  it("ducted kort nozzle most efficient", () => {
    expect(efficiency("ducted_kort_nozzle")).toBeGreaterThan(efficiency("waterjet_impeller_pump"));
  });
});

describe("thrust", () => {
  it("ducted kort nozzle highest thrust", () => {
    expect(thrust("ducted_kort_nozzle")).toBeGreaterThan(thrust("waterjet_impeller_pump"));
  });
});

describe("maneuver", () => {
  it("azimuth podded best maneuver", () => {
    expect(maneuver("azimuth_podded_drive")).toBeGreaterThan(maneuver("fixed_pitch_solid"));
  });
});

describe("cavitation", () => {
  it("waterjet best cavitation resistance", () => {
    expect(cavitation("waterjet_impeller_pump")).toBeGreaterThan(cavitation("fixed_pitch_solid"));
  });
});

describe("ppCost", () => {
  it("azimuth podded most expensive", () => {
    expect(ppCost("azimuth_podded_drive")).toBeGreaterThan(ppCost("fixed_pitch_solid"));
  });
});

describe("variablePitch", () => {
  it("controllable pitch is variable", () => {
    expect(variablePitch("controllable_pitch_hub")).toBe(true);
  });
  it("fixed pitch not variable", () => {
    expect(variablePitch("fixed_pitch_solid")).toBe(false);
  });
});

describe("forDeepDraft", () => {
  it("fixed pitch for deep draft", () => {
    expect(forDeepDraft("fixed_pitch_solid")).toBe(true);
  });
  it("waterjet not for deep draft", () => {
    expect(forDeepDraft("waterjet_impeller_pump")).toBe(false);
  });
});

describe("drive", () => {
  it("azimuth uses electric pod 360", () => {
    expect(drive("azimuth_podded_drive")).toBe("electric_pod_360_rotate");
  });
});

describe("bestUse", () => {
  it("ducted kort nozzle best for tug boat", () => {
    expect(bestUse("ducted_kort_nozzle")).toBe("tug_boat_bollard_pull_max");
  });
});

describe("propellerTypes", () => {
  it("returns 5 types", () => {
    expect(propellerTypes()).toHaveLength(5);
  });
});

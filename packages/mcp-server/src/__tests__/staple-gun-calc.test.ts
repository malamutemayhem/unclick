import { describe, it, expect } from "vitest";
import {
  drivePower, speedFire, controlAim, fatigueEase,
  gunCost, powered, pneumatic, driveMethod,
  bestUse, stapleGuns,
} from "../staple-gun-calc.js";

describe("drivePower", () => {
  it("pneumatic air heavy strongest drive", () => {
    expect(drivePower("pneumatic_air_heavy")).toBeGreaterThan(drivePower("manual_squeeze_standard"));
  });
});

describe("speedFire", () => {
  it("pneumatic air heavy fastest fire", () => {
    expect(speedFire("pneumatic_air_heavy")).toBeGreaterThan(speedFire("manual_squeeze_standard"));
  });
});

describe("controlAim", () => {
  it("manual squeeze standard best aim control", () => {
    expect(controlAim("manual_squeeze_standard")).toBeGreaterThan(controlAim("hammer_tacker_fast"));
  });
});

describe("fatigueEase", () => {
  it("pneumatic air heavy least fatigue", () => {
    expect(fatigueEase("pneumatic_air_heavy")).toBeGreaterThan(fatigueEase("manual_squeeze_standard"));
  });
});

describe("gunCost", () => {
  it("pneumatic air heavy most expensive", () => {
    expect(gunCost("pneumatic_air_heavy")).toBeGreaterThan(gunCost("hammer_tacker_fast"));
  });
});

describe("powered", () => {
  it("electric trigger power is powered", () => {
    expect(powered("electric_trigger_power")).toBe(true);
  });
  it("manual squeeze standard not powered", () => {
    expect(powered("manual_squeeze_standard")).toBe(false);
  });
});

describe("pneumatic", () => {
  it("pneumatic air heavy is pneumatic", () => {
    expect(pneumatic("pneumatic_air_heavy")).toBe(true);
  });
  it("electric trigger power not pneumatic", () => {
    expect(pneumatic("electric_trigger_power")).toBe(false);
  });
});

describe("driveMethod", () => {
  it("pneumatic air heavy uses air cylinder drive", () => {
    expect(driveMethod("pneumatic_air_heavy")).toBe("air_cylinder_drive");
  });
});

describe("bestUse", () => {
  it("manual squeeze standard best for general fabric attach", () => {
    expect(bestUse("manual_squeeze_standard")).toBe("general_fabric_attach");
  });
});

describe("stapleGuns", () => {
  it("returns 5 types", () => {
    expect(stapleGuns()).toHaveLength(5);
  });
});

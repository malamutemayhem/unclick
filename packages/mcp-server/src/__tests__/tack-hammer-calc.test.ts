import { describe, it, expect } from "vitest";
import {
  driveAccuracy, speedTack, controlFeel, fabricSafe,
  tackCost, magnetic, powered, headStyle,
  bestUse, tackHammers,
} from "../tack-hammer-calc.js";

describe("driveAccuracy", () => {
  it("magnetic tip hold most accurate drive", () => {
    expect(driveAccuracy("magnetic_tip_hold")).toBeGreaterThan(driveAccuracy("staple_gun_pneumatic"));
  });
});

describe("speedTack", () => {
  it("staple gun pneumatic fastest tack", () => {
    expect(speedTack("staple_gun_pneumatic")).toBeGreaterThan(speedTack("claw_pull_remove"));
  });
});

describe("controlFeel", () => {
  it("magnetic tip hold best control feel", () => {
    expect(controlFeel("magnetic_tip_hold")).toBeGreaterThan(controlFeel("staple_gun_pneumatic"));
  });
});

describe("fabricSafe", () => {
  it("lightweight trim tap safest for fabric", () => {
    expect(fabricSafe("lightweight_trim_tap")).toBeGreaterThan(fabricSafe("staple_gun_pneumatic"));
  });
});

describe("tackCost", () => {
  it("staple gun pneumatic most expensive", () => {
    expect(tackCost("staple_gun_pneumatic")).toBeGreaterThan(tackCost("double_face_flat"));
  });
});

describe("magnetic", () => {
  it("magnetic tip hold is magnetic", () => {
    expect(magnetic("magnetic_tip_hold")).toBe(true);
  });
  it("double face flat not magnetic", () => {
    expect(magnetic("double_face_flat")).toBe(false);
  });
});

describe("powered", () => {
  it("staple gun pneumatic is powered", () => {
    expect(powered("staple_gun_pneumatic")).toBe(true);
  });
  it("magnetic tip hold not powered", () => {
    expect(powered("magnetic_tip_hold")).toBe(false);
  });
});

describe("headStyle", () => {
  it("claw pull remove uses claw split pull", () => {
    expect(headStyle("claw_pull_remove")).toBe("claw_split_pull");
  });
});

describe("bestUse", () => {
  it("lightweight trim tap best for trim gimp tack", () => {
    expect(bestUse("lightweight_trim_tap")).toBe("trim_gimp_tack");
  });
});

describe("tackHammers", () => {
  it("returns 5 types", () => {
    expect(tackHammers()).toHaveLength(5);
  });
});

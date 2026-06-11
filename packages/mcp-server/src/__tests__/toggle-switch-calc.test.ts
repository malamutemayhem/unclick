import { describe, it, expect } from "vitest";
import {
  currentRating, actuationForce, cycleLife, sizeCompact,
  switchCost, momentary, withGuard, poleThrow,
  bestUse, toggleSwitches,
} from "../toggle-switch-calc.js";

describe("currentRating", () => {
  it("locking safety cover highest current rating", () => {
    expect(currentRating("locking_safety_cover")).toBeGreaterThan(currentRating("spst_on_off_mini"));
  });
});

describe("actuationForce", () => {
  it("locking safety cover highest actuation force", () => {
    expect(actuationForce("locking_safety_cover")).toBeGreaterThan(actuationForce("momentary_spring_return"));
  });
});

describe("cycleLife", () => {
  it("momentary spring return longest cycle life", () => {
    expect(cycleLife("momentary_spring_return")).toBeGreaterThan(cycleLife("spst_on_off_mini"));
  });
});

describe("sizeCompact", () => {
  it("spst on off mini most compact", () => {
    expect(sizeCompact("spst_on_off_mini")).toBeGreaterThan(sizeCompact("locking_safety_cover"));
  });
});

describe("switchCost", () => {
  it("locking safety cover most expensive", () => {
    expect(switchCost("locking_safety_cover")).toBeGreaterThan(switchCost("spst_on_off_mini"));
  });
});

describe("momentary", () => {
  it("momentary spring return is momentary", () => {
    expect(momentary("momentary_spring_return")).toBe(true);
  });
  it("spdt on on not momentary", () => {
    expect(momentary("spdt_on_on_standard")).toBe(false);
  });
});

describe("withGuard", () => {
  it("locking safety cover has guard", () => {
    expect(withGuard("locking_safety_cover")).toBe(true);
  });
  it("spst on off mini no guard", () => {
    expect(withGuard("spst_on_off_mini")).toBe(false);
  });
});

describe("poleThrow", () => {
  it("dpdt center off uses double pole double throw", () => {
    expect(poleThrow("dpdt_center_off")).toBe("double_pole_double_throw");
  });
});

describe("bestUse", () => {
  it("dpdt center off best for motor forward reverse", () => {
    expect(bestUse("dpdt_center_off")).toBe("motor_forward_reverse");
  });
});

describe("toggleSwitches", () => {
  it("returns 5 types", () => {
    expect(toggleSwitches()).toHaveLength(5);
  });
});

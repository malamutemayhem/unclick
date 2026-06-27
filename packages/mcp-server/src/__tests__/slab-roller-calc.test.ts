import { describe, it, expect } from "vitest";
import {
  slabConsistency, maxWidth, easeOfUse, spaceNeeded,
  rollerCost, thicknessControl, portable, rollMechanism,
  bestProject, slabRollers,
} from "../slab-roller-calc.js";

describe("slabConsistency", () => {
  it("floor standing heavy most consistent slab", () => {
    expect(slabConsistency("floor_standing_heavy")).toBeGreaterThan(slabConsistency("rolling_pin_manual"));
  });
});

describe("maxWidth", () => {
  it("floor standing heavy widest max width", () => {
    expect(maxWidth("floor_standing_heavy")).toBeGreaterThan(maxWidth("extruder_press_shape"));
  });
});

describe("easeOfUse", () => {
  it("rolling pin manual easiest to use", () => {
    expect(easeOfUse("rolling_pin_manual")).toBeGreaterThan(easeOfUse("extruder_press_shape"));
  });
});

describe("spaceNeeded", () => {
  it("rolling pin manual needs least space", () => {
    expect(spaceNeeded("rolling_pin_manual")).toBeGreaterThan(spaceNeeded("floor_standing_heavy"));
  });
});

describe("rollerCost", () => {
  it("floor standing heavy most expensive", () => {
    expect(rollerCost("floor_standing_heavy")).toBeGreaterThan(rollerCost("rolling_pin_manual"));
  });
});

describe("thicknessControl", () => {
  it("tabletop hand crank has thickness control", () => {
    expect(thicknessControl("tabletop_hand_crank")).toBe(true);
  });
  it("rolling pin manual has no thickness control", () => {
    expect(thicknessControl("rolling_pin_manual")).toBe(false);
  });
});

describe("portable", () => {
  it("rolling pin manual is portable", () => {
    expect(portable("rolling_pin_manual")).toBe(true);
  });
  it("floor standing heavy is not portable", () => {
    expect(portable("floor_standing_heavy")).toBe(false);
  });
});

describe("rollMechanism", () => {
  it("floor standing heavy uses dual roller spring", () => {
    expect(rollMechanism("floor_standing_heavy")).toBe("dual_roller_spring");
  });
});

describe("bestProject", () => {
  it("rolling pin manual best for beginner home craft", () => {
    expect(bestProject("rolling_pin_manual")).toBe("beginner_home_craft");
  });
});

describe("slabRollers", () => {
  it("returns 5 types", () => {
    expect(slabRollers()).toHaveLength(5);
  });
});

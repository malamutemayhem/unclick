import { describe, it, expect } from "vitest";
import {
  maxHeight, stability, portability, loadCapacity,
  standCost, hasWheels, nestableLegs, legType,
  bestUse, lightStands,
} from "../light-stand-calc.js";

describe("maxHeight", () => {
  it("boom arm counterweight tallest reach", () => {
    expect(maxHeight("boom_arm_counterweight")).toBeGreaterThan(maxHeight("mini_backlight_low"));
  });
});

describe("stability", () => {
  it("c stand turtle base most stable", () => {
    expect(stability("c_stand_turtle_base")).toBeGreaterThan(stability("standard_air_cushion"));
  });
});

describe("portability", () => {
  it("mini backlight low most portable", () => {
    expect(portability("mini_backlight_low")).toBeGreaterThan(portability("boom_arm_counterweight"));
  });
});

describe("loadCapacity", () => {
  it("boom arm counterweight highest load", () => {
    expect(loadCapacity("boom_arm_counterweight")).toBeGreaterThan(loadCapacity("mini_backlight_low"));
  });
});

describe("standCost", () => {
  it("boom arm counterweight most expensive", () => {
    expect(standCost("boom_arm_counterweight")).toBeGreaterThan(standCost("mini_backlight_low"));
  });
});

describe("hasWheels", () => {
  it("rolling caster heavy has wheels", () => {
    expect(hasWheels("rolling_caster_heavy")).toBe(true);
  });
  it("c stand turtle base does not", () => {
    expect(hasWheels("c_stand_turtle_base")).toBe(false);
  });
});

describe("nestableLegs", () => {
  it("c stand turtle base has nestable legs", () => {
    expect(nestableLegs("c_stand_turtle_base")).toBe(true);
  });
  it("standard air cushion does not", () => {
    expect(nestableLegs("standard_air_cushion")).toBe(false);
  });
});

describe("legType", () => {
  it("rolling caster heavy uses steel tri caster lock", () => {
    expect(legType("rolling_caster_heavy")).toBe("steel_tri_caster_lock");
  });
});

describe("bestUse", () => {
  it("c stand turtle base best for studio flag arm grip", () => {
    expect(bestUse("c_stand_turtle_base")).toBe("studio_flag_arm_grip");
  });
});

describe("lightStands", () => {
  it("returns 5 types", () => {
    expect(lightStands()).toHaveLength(5);
  });
});

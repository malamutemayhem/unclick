import { describe, it, expect } from "vitest";
import {
  closenessShave, skinComfort, batteryLife, portability,
  razorCost, wetDryUse, selfCleaning, bladeSystem,
  bestUse, electricRazors,
} from "../electric-razor-calc.js";

describe("closenessShave", () => {
  it("foil head close shaves closest", () => {
    expect(closenessShave("foil_head_close")).toBeGreaterThan(closenessShave("body_groomer_wet"));
  });
});

describe("skinComfort", () => {
  it("rotary triple head most comfortable on skin", () => {
    expect(skinComfort("rotary_triple_head")).toBeGreaterThan(skinComfort("single_foil_travel"));
  });
});

describe("batteryLife", () => {
  it("rotary triple head longest battery life", () => {
    expect(batteryLife("rotary_triple_head")).toBeGreaterThan(batteryLife("single_foil_travel"));
  });
});

describe("portability", () => {
  it("single foil travel most portable", () => {
    expect(portability("single_foil_travel")).toBeGreaterThan(portability("rotary_triple_head"));
  });
});

describe("razorCost", () => {
  it("rotary triple head most expensive", () => {
    expect(razorCost("rotary_triple_head")).toBeGreaterThan(razorCost("single_foil_travel"));
  });
});

describe("wetDryUse", () => {
  it("body groomer wet supports wet dry use", () => {
    expect(wetDryUse("body_groomer_wet")).toBe(true);
  });
  it("foil head close does not", () => {
    expect(wetDryUse("foil_head_close")).toBe(false);
  });
});

describe("selfCleaning", () => {
  it("foil head close has self cleaning", () => {
    expect(selfCleaning("foil_head_close")).toBe(true);
  });
  it("body groomer wet does not", () => {
    expect(selfCleaning("body_groomer_wet")).toBe(false);
  });
});

describe("bladeSystem", () => {
  it("rotary triple head uses circular blade flex pivot", () => {
    expect(bladeSystem("rotary_triple_head")).toBe("circular_blade_flex_pivot");
  });
});

describe("bestUse", () => {
  it("body groomer wet best for full body shower groom", () => {
    expect(bestUse("body_groomer_wet")).toBe("full_body_shower_groom");
  });
});

describe("electricRazors", () => {
  it("returns 5 types", () => {
    expect(electricRazors()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  threadControl, knotSpeed, threadCapacity, handComfort,
  shuttleCost, hasHook, forBeginner, bodyShape,
  bestUse, tattingShuttles,
} from "../tatting-shuttle-calc.js";

describe("threadControl", () => {
  it("clover ergonomic best thread control", () => {
    expect(threadControl("clover_ergonomic")).toBeGreaterThan(threadControl("needle_tatting_long"));
  });
});

describe("knotSpeed", () => {
  it("aero slim speed fastest knot", () => {
    expect(knotSpeed("aero_slim_speed")).toBeGreaterThan(knotSpeed("needle_tatting_long"));
  });
});

describe("threadCapacity", () => {
  it("classic post wind most thread capacity", () => {
    expect(threadCapacity("classic_post_wind")).toBeGreaterThan(threadCapacity("aero_slim_speed"));
  });
});

describe("handComfort", () => {
  it("clover ergonomic most hand comfort", () => {
    expect(handComfort("clover_ergonomic")).toBeGreaterThan(handComfort("classic_post_wind"));
  });
});

describe("shuttleCost", () => {
  it("clover ergonomic most expensive", () => {
    expect(shuttleCost("clover_ergonomic")).toBeGreaterThan(shuttleCost("classic_post_wind"));
  });
});

describe("hasHook", () => {
  it("pop shuttle hook has hook", () => {
    expect(hasHook("pop_shuttle_hook")).toBe(true);
  });
  it("classic post wind no hook", () => {
    expect(hasHook("classic_post_wind")).toBe(false);
  });
});

describe("forBeginner", () => {
  it("needle tatting long is for beginner", () => {
    expect(forBeginner("needle_tatting_long")).toBe(true);
  });
  it("classic post wind not for beginner", () => {
    expect(forBeginner("classic_post_wind")).toBe(false);
  });
});

describe("bodyShape", () => {
  it("aero slim speed uses slim flat profile", () => {
    expect(bodyShape("aero_slim_speed")).toBe("slim_flat_profile");
  });
});

describe("bestUse", () => {
  it("clover ergonomic best for comfortable long session", () => {
    expect(bestUse("clover_ergonomic")).toBe("comfortable_long_session");
  });
});

describe("tattingShuttles", () => {
  it("returns 5 types", () => {
    expect(tattingShuttles()).toHaveLength(5);
  });
});

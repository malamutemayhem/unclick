import { describe, it, expect } from "vitest";
import {
  tensionForce, gripSecure, speedWork, fabricSafe,
  stretchCost, leverAction, forJute, jawType,
  bestUse, webbingStretchers,
} from "../webbing-stretch-calc.js";

describe("tensionForce", () => {
  it("ratchet strap mech strongest tension", () => {
    expect(tensionForce("ratchet_strap_mech")).toBeGreaterThan(tensionForce("slot_loop_wrap"));
  });
});

describe("gripSecure", () => {
  it("spike tooth grab most secure grip", () => {
    expect(gripSecure("spike_tooth_grab")).toBeGreaterThan(gripSecure("slot_loop_wrap"));
  });
});

describe("speedWork", () => {
  it("slot loop wrap fastest work", () => {
    expect(speedWork("slot_loop_wrap")).toBeGreaterThan(speedWork("ratchet_strap_mech"));
  });
});

describe("fabricSafe", () => {
  it("rubber jaw grip safest for fabric", () => {
    expect(fabricSafe("rubber_jaw_grip")).toBeGreaterThan(fabricSafe("spike_tooth_grab"));
  });
});

describe("stretchCost", () => {
  it("ratchet strap mech most expensive", () => {
    expect(stretchCost("ratchet_strap_mech")).toBeGreaterThan(stretchCost("slot_loop_wrap"));
  });
});

describe("leverAction", () => {
  it("gooseneck lever pull has lever action", () => {
    expect(leverAction("gooseneck_lever_pull")).toBe(true);
  });
  it("rubber jaw grip no lever action", () => {
    expect(leverAction("rubber_jaw_grip")).toBe(false);
  });
});

describe("forJute", () => {
  it("gooseneck lever pull is for jute", () => {
    expect(forJute("gooseneck_lever_pull")).toBe(true);
  });
  it("rubber jaw grip not for jute", () => {
    expect(forJute("rubber_jaw_grip")).toBe(false);
  });
});

describe("jawType", () => {
  it("ratchet strap mech uses ratchet lock strap", () => {
    expect(jawType("ratchet_strap_mech")).toBe("ratchet_lock_strap");
  });
});

describe("bestUse", () => {
  it("ratchet strap mech best for max tension hold", () => {
    expect(bestUse("ratchet_strap_mech")).toBe("max_tension_hold");
  });
});

describe("webbingStretchers", () => {
  it("returns 5 types", () => {
    expect(webbingStretchers()).toHaveLength(5);
  });
});

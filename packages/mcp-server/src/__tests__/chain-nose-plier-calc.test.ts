import { describe, it, expect } from "vitest";
import {
  gripPrecision, tightAccess, holdingForce, markFree,
  plierCost, makesLoops, nylonJaw, jawProfile,
  bestTask, chainNosePliers,
} from "../chain-nose-plier-calc.js";

describe("gripPrecision", () => {
  it("standard taper smooth most grip precision", () => {
    expect(gripPrecision("standard_taper_smooth")).toBeGreaterThan(gripPrecision("round_nose_loop"));
  });
});

describe("tightAccess", () => {
  it("bent nose angle best tight access", () => {
    expect(tightAccess("bent_nose_angle")).toBeGreaterThan(tightAccess("nylon_jaw_protect"));
  });
});

describe("holdingForce", () => {
  it("flat nose parallel most holding force", () => {
    expect(holdingForce("flat_nose_parallel")).toBeGreaterThan(holdingForce("round_nose_loop"));
  });
});

describe("markFree", () => {
  it("nylon jaw protect most mark free", () => {
    expect(markFree("nylon_jaw_protect")).toBeGreaterThan(markFree("bent_nose_angle"));
  });
});

describe("plierCost", () => {
  it("all same cost level", () => {
    expect(plierCost("standard_taper_smooth")).toBe(2);
  });
});

describe("makesLoops", () => {
  it("round nose loop makes loops", () => {
    expect(makesLoops("round_nose_loop")).toBe(true);
  });
  it("standard taper smooth does not make loops", () => {
    expect(makesLoops("standard_taper_smooth")).toBe(false);
  });
});

describe("nylonJaw", () => {
  it("nylon jaw protect has nylon jaw", () => {
    expect(nylonJaw("nylon_jaw_protect")).toBe(true);
  });
  it("standard taper smooth has no nylon jaw", () => {
    expect(nylonJaw("standard_taper_smooth")).toBe(false);
  });
});

describe("jawProfile", () => {
  it("bent nose angle uses angled taper bend", () => {
    expect(jawProfile("bent_nose_angle")).toBe("angled_taper_bend");
  });
});

describe("bestTask", () => {
  it("round nose loop best for eye pin loop form", () => {
    expect(bestTask("round_nose_loop")).toBe("eye_pin_loop_form");
  });
});

describe("chainNosePliers", () => {
  it("returns 5 types", () => {
    expect(chainNosePliers()).toHaveLength(5);
  });
});

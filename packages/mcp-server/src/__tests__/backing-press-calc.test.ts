import { describe, it, expect } from "vitest";
import {
  spineControl, backForce, setupSpeed, bookRange,
  backingCost, adjustable, forLargeBooks, cradleType,
  bestUse, backingPresses,
} from "../backing-press-calc.js";

describe("spineControl", () => {
  it("screw jaw heavy best spine control", () => {
    expect(spineControl("screw_jaw_heavy")).toBeGreaterThan(spineControl("spring_loaded_quick"));
  });
});

describe("backForce", () => {
  it("screw jaw heavy strongest back force", () => {
    expect(backForce("screw_jaw_heavy")).toBeGreaterThan(backForce("spring_loaded_quick"));
  });
});

describe("setupSpeed", () => {
  it("spring loaded quick fastest setup", () => {
    expect(setupSpeed("spring_loaded_quick")).toBeGreaterThan(setupSpeed("screw_jaw_heavy"));
  });
});

describe("bookRange", () => {
  it("adjustable angle tilt widest range", () => {
    expect(bookRange("adjustable_angle_tilt")).toBeGreaterThan(bookRange("spring_loaded_quick"));
  });
});

describe("backingCost", () => {
  it("adjustable angle tilt most expensive", () => {
    expect(backingCost("adjustable_angle_tilt")).toBeGreaterThan(backingCost("v_cradle_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable angle tilt is adjustable", () => {
    expect(adjustable("adjustable_angle_tilt")).toBe(true);
  });
  it("v cradle standard not adjustable", () => {
    expect(adjustable("v_cradle_standard")).toBe(false);
  });
});

describe("forLargeBooks", () => {
  it("screw jaw heavy is for large books", () => {
    expect(forLargeBooks("screw_jaw_heavy")).toBe(true);
  });
  it("v cradle standard not for large books", () => {
    expect(forLargeBooks("v_cradle_standard")).toBe(false);
  });
});

describe("cradleType", () => {
  it("bench mount fixed uses bolted bench base", () => {
    expect(cradleType("bench_mount_fixed")).toBe("bolted_bench_base");
  });
});

describe("bestUse", () => {
  it("adjustable angle tilt best for variable spine angle", () => {
    expect(bestUse("adjustable_angle_tilt")).toBe("variable_spine_angle");
  });
});

describe("backingPresses", () => {
  it("returns 5 types", () => {
    expect(backingPresses()).toHaveLength(5);
  });
});

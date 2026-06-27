import { describe, it, expect } from "vitest";
import {
  lineAccuracy, settingHold, easeOfUse, maxSpan,
  dividerCost, lockable, forCreasing, legMaterial,
  bestUse, wingDividers,
} from "../wing-divider-calc.js";

describe("lineAccuracy", () => {
  it("spring bow fine most accurate line", () => {
    expect(lineAccuracy("spring_bow_fine")).toBeGreaterThan(lineAccuracy("steel_point_basic"));
  });
});

describe("settingHold", () => {
  it("locking screw set best setting hold", () => {
    expect(settingHold("locking_screw_set")).toBeGreaterThan(settingHold("steel_point_basic"));
  });
});

describe("easeOfUse", () => {
  it("steel point basic easiest to use", () => {
    expect(easeOfUse("steel_point_basic")).toBeGreaterThan(easeOfUse("spring_bow_fine"));
  });
});

describe("maxSpan", () => {
  it("compass wheel arc widest max span", () => {
    expect(maxSpan("compass_wheel_arc")).toBeGreaterThan(maxSpan("spring_bow_fine"));
  });
});

describe("dividerCost", () => {
  it("spring bow fine most expensive", () => {
    expect(dividerCost("spring_bow_fine")).toBeGreaterThan(dividerCost("steel_point_basic"));
  });
});

describe("lockable", () => {
  it("locking screw set is lockable", () => {
    expect(lockable("locking_screw_set")).toBe(true);
  });
  it("steel point basic not lockable", () => {
    expect(lockable("steel_point_basic")).toBe(false);
  });
});

describe("forCreasing", () => {
  it("creaser tip line is for creasing", () => {
    expect(forCreasing("creaser_tip_line")).toBe(true);
  });
  it("steel point basic not for creasing", () => {
    expect(forCreasing("steel_point_basic")).toBe(false);
  });
});

describe("legMaterial", () => {
  it("steel point basic uses carbon steel forged", () => {
    expect(legMaterial("steel_point_basic")).toBe("carbon_steel_forged");
  });
});

describe("bestUse", () => {
  it("spring bow fine best for precise stitch space", () => {
    expect(bestUse("spring_bow_fine")).toBe("precise_stitch_space");
  });
});

describe("wingDividers", () => {
  it("returns 5 types", () => {
    expect(wingDividers()).toHaveLength(5);
  });
});

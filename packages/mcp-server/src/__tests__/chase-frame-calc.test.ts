import { describe, it, expect } from "vitest";
import {
  lockStrength, weightHandle, sizeRange, setupSpeed,
  frameCost, magnetic, adjustable, frameMaterial,
  bestUse, chaseFrames,
} from "../chase-frame-calc.js";

describe("lockStrength", () => {
  it("steel lockup standard strongest lock", () => {
    expect(lockStrength("steel_lockup_standard")).toBeGreaterThan(lockStrength("wood_proof_press"));
  });
});

describe("weightHandle", () => {
  it("aluminum light quick lightest", () => {
    expect(weightHandle("aluminum_light_quick")).toBeGreaterThan(weightHandle("steel_lockup_standard"));
  });
});

describe("sizeRange", () => {
  it("adjustable expand set widest size range", () => {
    expect(sizeRange("adjustable_expand_set")).toBeGreaterThan(sizeRange("magnetic_base_hold"));
  });
});

describe("setupSpeed", () => {
  it("magnetic base hold fastest setup", () => {
    expect(setupSpeed("magnetic_base_hold")).toBeGreaterThan(setupSpeed("steel_lockup_standard"));
  });
});

describe("frameCost", () => {
  it("magnetic base hold most expensive", () => {
    expect(frameCost("magnetic_base_hold")).toBeGreaterThan(frameCost("wood_proof_press"));
  });
});

describe("magnetic", () => {
  it("magnetic base hold is magnetic", () => {
    expect(magnetic("magnetic_base_hold")).toBe(true);
  });
  it("steel lockup standard not magnetic", () => {
    expect(magnetic("steel_lockup_standard")).toBe(false);
  });
});

describe("adjustable", () => {
  it("adjustable expand set is adjustable", () => {
    expect(adjustable("adjustable_expand_set")).toBe(true);
  });
  it("steel lockup standard not adjustable", () => {
    expect(adjustable("steel_lockup_standard")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("steel lockup standard uses cast steel machined", () => {
    expect(frameMaterial("steel_lockup_standard")).toBe("cast_steel_machined");
  });
});

describe("bestUse", () => {
  it("magnetic base hold best for quick polymer plate", () => {
    expect(bestUse("magnetic_base_hold")).toBe("quick_polymer_plate");
  });
});

describe("chaseFrames", () => {
  it("returns 5 types", () => {
    expect(chaseFrames()).toHaveLength(5);
  });
});

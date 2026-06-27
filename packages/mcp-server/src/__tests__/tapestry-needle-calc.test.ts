import { describe, it, expect } from "vitest";
import {
  eyeSize, weaveEase, threadRange, durability,
  needleCost, bluntTip, locking, needleMaterial,
  bestUse, tapestryNeedles,
} from "../tapestry-needle-calc.js";

describe("eyeSize", () => {
  it("jumbo plastic big largest eye", () => {
    expect(eyeSize("jumbo_plastic_big")).toBeGreaterThan(eyeSize("steel_fine_sharp"));
  });
});

describe("weaveEase", () => {
  it("bent tip angle easiest weave", () => {
    expect(weaveEase("bent_tip_angle")).toBeGreaterThan(weaveEase("steel_fine_sharp"));
  });
});

describe("threadRange", () => {
  it("steel fine sharp widest thread range", () => {
    expect(threadRange("steel_fine_sharp")).toBeGreaterThan(threadRange("jumbo_plastic_big"));
  });
});

describe("durability", () => {
  it("steel fine sharp most durable", () => {
    expect(durability("steel_fine_sharp")).toBeGreaterThan(durability("jumbo_plastic_big"));
  });
});

describe("needleCost", () => {
  it("chibi short lock most expensive", () => {
    expect(needleCost("chibi_short_lock")).toBeGreaterThan(needleCost("blunt_tip_large"));
  });
});

describe("bluntTip", () => {
  it("blunt tip large has blunt tip", () => {
    expect(bluntTip("blunt_tip_large")).toBe(true);
  });
  it("steel fine sharp not blunt tip", () => {
    expect(bluntTip("steel_fine_sharp")).toBe(false);
  });
});

describe("locking", () => {
  it("chibi short lock has locking", () => {
    expect(locking("chibi_short_lock")).toBe(true);
  });
  it("blunt tip large no locking", () => {
    expect(locking("blunt_tip_large")).toBe(false);
  });
});

describe("needleMaterial", () => {
  it("blunt tip large uses nickel plate steel", () => {
    expect(needleMaterial("blunt_tip_large")).toBe("nickel_plate_steel");
  });
});

describe("bestUse", () => {
  it("bent tip angle best for tight space seam", () => {
    expect(bestUse("bent_tip_angle")).toBe("tight_space_seam");
  });
});

describe("tapestryNeedles", () => {
  it("returns 5 types", () => {
    expect(tapestryNeedles()).toHaveLength(5);
  });
});

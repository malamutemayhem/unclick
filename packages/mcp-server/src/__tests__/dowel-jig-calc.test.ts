import { describe, it, expect } from "vitest";
import {
  alignAccuracy, setupSpeed, sizeRange, durability,
  jigCost, selfCentering, forAngled, guideMethod,
  bestUse, dowelJigs,
} from "../dowel-jig-calc.js";

describe("alignAccuracy", () => {
  it("precision guide bore best alignment accuracy", () => {
    expect(alignAccuracy("precision_guide_bore")).toBeGreaterThan(alignAccuracy("loose_bushing_basic"));
  });
});

describe("setupSpeed", () => {
  it("self centering clamp fastest setup", () => {
    expect(setupSpeed("self_centering_clamp")).toBeGreaterThan(setupSpeed("loose_bushing_basic"));
  });
});

describe("sizeRange", () => {
  it("precision guide bore widest size range", () => {
    expect(sizeRange("precision_guide_bore")).toBeGreaterThan(sizeRange("doweling_plate_fixed"));
  });
});

describe("durability", () => {
  it("doweling plate fixed most durable", () => {
    expect(durability("doweling_plate_fixed")).toBeGreaterThan(durability("loose_bushing_basic"));
  });
});

describe("jigCost", () => {
  it("precision guide bore most expensive", () => {
    expect(jigCost("precision_guide_bore")).toBeGreaterThan(jigCost("loose_bushing_basic"));
  });
});

describe("selfCentering", () => {
  it("self centering clamp is self centering", () => {
    expect(selfCentering("self_centering_clamp")).toBe(true);
  });
  it("doweling plate fixed not self centering", () => {
    expect(selfCentering("doweling_plate_fixed")).toBe(false);
  });
});

describe("forAngled", () => {
  it("pocket dowel angled is for angled", () => {
    expect(forAngled("pocket_dowel_angled")).toBe(true);
  });
  it("self centering clamp not for angled", () => {
    expect(forAngled("self_centering_clamp")).toBe(false);
  });
});

describe("guideMethod", () => {
  it("loose bushing basic uses removable bushing", () => {
    expect(guideMethod("loose_bushing_basic")).toBe("removable_bushing");
  });
});

describe("bestUse", () => {
  it("pocket dowel angled best for angled joint dowel", () => {
    expect(bestUse("pocket_dowel_angled")).toBe("angled_joint_dowel");
  });
});

describe("dowelJigs", () => {
  it("returns 5 types", () => {
    expect(dowelJigs()).toHaveLength(5);
  });
});

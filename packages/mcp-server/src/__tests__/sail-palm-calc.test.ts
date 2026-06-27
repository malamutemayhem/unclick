import { describe, it, expect } from "vitest";
import {
  pushForce, needleGuide, handComfort, durability,
  palmCost, forRoping, adjustable, ironType,
  bestUse, sailPalms,
} from "../sail-palm-calc.js";

describe("pushForce", () => {
  it("roping palm heavy strongest push", () => {
    expect(pushForce("roping_palm_heavy")).toBeGreaterThan(pushForce("seaming_palm_light"));
  });
});

describe("needleGuide", () => {
  it("seaming palm light best needle guide", () => {
    expect(needleGuide("seaming_palm_light")).toBeGreaterThan(needleGuide("adjustable_strap_fit"));
  });
});

describe("handComfort", () => {
  it("adjustable strap fit most comfortable", () => {
    expect(handComfort("adjustable_strap_fit")).toBeGreaterThan(handComfort("roping_palm_heavy"));
  });
});

describe("durability", () => {
  it("roping palm heavy most durable", () => {
    expect(durability("roping_palm_heavy")).toBeGreaterThan(durability("adjustable_strap_fit"));
  });
});

describe("palmCost", () => {
  it("adjustable strap fit most expensive", () => {
    expect(palmCost("adjustable_strap_fit")).toBeGreaterThan(palmCost("seaming_palm_light"));
  });
});

describe("forRoping", () => {
  it("roping palm heavy is for roping", () => {
    expect(forRoping("roping_palm_heavy")).toBe(true);
  });
  it("seaming palm light not for roping", () => {
    expect(forRoping("seaming_palm_light")).toBe(false);
  });
});

describe("adjustable", () => {
  it("adjustable strap fit is adjustable", () => {
    expect(adjustable("adjustable_strap_fit")).toBe(true);
  });
  it("roping palm heavy not adjustable", () => {
    expect(adjustable("roping_palm_heavy")).toBe(false);
  });
});

describe("ironType", () => {
  it("seaming palm light uses flat dimple iron", () => {
    expect(ironType("seaming_palm_light")).toBe("flat_dimple_iron");
  });
});

describe("bestUse", () => {
  it("roping palm heavy best for heavy bolt rope", () => {
    expect(bestUse("roping_palm_heavy")).toBe("heavy_bolt_rope");
  });
});

describe("sailPalms", () => {
  it("returns 5 types", () => {
    expect(sailPalms()).toHaveLength(5);
  });
});

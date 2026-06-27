import { describe, it, expect } from "vitest";
import {
  weaveFlex, strength, surfaceSmooth, splitEase,
  splintCost, bark, hardwood, woodType,
  bestUse, splintWeaves,
} from "../splint-weave-calc.js";

describe("weaveFlex", () => {
  it("ash splint standard most flexible weave", () => {
    expect(weaveFlex("ash_splint_standard")).toBeGreaterThan(weaveFlex("oak_splint_heavy"));
  });
});

describe("strength", () => {
  it("hickory splint tough strongest", () => {
    expect(strength("hickory_splint_tough")).toBeGreaterThan(strength("reed_splint_light"));
  });
});

describe("surfaceSmooth", () => {
  it("birch bark natural smoothest surface", () => {
    expect(surfaceSmooth("birch_bark_natural")).toBeGreaterThan(surfaceSmooth("hickory_splint_tough"));
  });
});

describe("splitEase", () => {
  it("reed splint light easiest split", () => {
    expect(splitEase("reed_splint_light")).toBeGreaterThan(splitEase("oak_splint_heavy"));
  });
});

describe("splintCost", () => {
  it("hickory splint tough most expensive", () => {
    expect(splintCost("hickory_splint_tough")).toBeGreaterThan(splintCost("reed_splint_light"));
  });
});

describe("bark", () => {
  it("birch bark natural is bark", () => {
    expect(bark("birch_bark_natural")).toBe(true);
  });
  it("ash splint standard not bark", () => {
    expect(bark("ash_splint_standard")).toBe(false);
  });
});

describe("hardwood", () => {
  it("ash splint standard is hardwood", () => {
    expect(hardwood("ash_splint_standard")).toBe(true);
  });
  it("reed splint light not hardwood", () => {
    expect(hardwood("reed_splint_light")).toBe(false);
  });
});

describe("woodType", () => {
  it("birch bark natural uses white birch bark", () => {
    expect(woodType("birch_bark_natural")).toBe("white_birch_bark");
  });
});

describe("bestUse", () => {
  it("ash splint standard best for general basket weave", () => {
    expect(bestUse("ash_splint_standard")).toBe("general_basket_weave");
  });
});

describe("splintWeaves", () => {
  it("returns 5 types", () => {
    expect(splintWeaves()).toHaveLength(5);
  });
});

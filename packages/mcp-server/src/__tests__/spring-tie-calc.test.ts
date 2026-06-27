import { describe, it, expect } from "vitest";
import {
  holdSecure, speedAttach, adjustable, durability,
  tieCost, reusable, forSinuous, clipStyle,
  bestUse, springTies,
} from "../spring-tie-calc.js";

describe("holdSecure", () => {
  it("hog ring clip most secure hold", () => {
    expect(holdSecure("hog_ring_clip")).toBeGreaterThan(holdSecure("nylon_zip_tie"));
  });
});

describe("speedAttach", () => {
  it("nylon zip tie fastest attach", () => {
    expect(speedAttach("nylon_zip_tie")).toBeGreaterThan(speedAttach("spring_twine_hand"));
  });
});

describe("adjustable", () => {
  it("spring twine hand most adjustable", () => {
    expect(adjustable("spring_twine_hand")).toBeGreaterThan(adjustable("hog_ring_clip"));
  });
});

describe("durability", () => {
  it("metal s clip most durable", () => {
    expect(durability("metal_s_clip")).toBeGreaterThan(durability("nylon_zip_tie"));
  });
});

describe("tieCost", () => {
  it("zig zag clip fast most expensive", () => {
    expect(tieCost("zig_zag_clip_fast")).toBeGreaterThan(tieCost("nylon_zip_tie"));
  });
});

describe("reusable", () => {
  it("metal s clip is reusable", () => {
    expect(reusable("metal_s_clip")).toBe(true);
  });
  it("hog ring clip not reusable", () => {
    expect(reusable("hog_ring_clip")).toBe(false);
  });
});

describe("forSinuous", () => {
  it("hog ring clip is for sinuous", () => {
    expect(forSinuous("hog_ring_clip")).toBe(true);
  });
  it("spring twine hand not for sinuous", () => {
    expect(forSinuous("spring_twine_hand")).toBe(false);
  });
});

describe("clipStyle", () => {
  it("metal s clip uses bent wire s hook", () => {
    expect(clipStyle("metal_s_clip")).toBe("bent_wire_s_hook");
  });
});

describe("bestUse", () => {
  it("hog ring clip best for sinuous spring attach", () => {
    expect(bestUse("hog_ring_clip")).toBe("sinuous_spring_attach");
  });
});

describe("springTies", () => {
  it("returns 5 types", () => {
    expect(springTies()).toHaveLength(5);
  });
});

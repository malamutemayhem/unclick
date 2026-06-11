import { describe, it, expect } from "vitest";
import {
  tensionEven, setupSpeed, sizeRange, portability,
  frameCost, adjustable, reusable, mountMethod,
  bestUse, silkFrames,
} from "../silk-frame-calc.js";

describe("tensionEven", () => {
  it("pin frame tension most even tension", () => {
    expect(tensionEven("pin_frame_tension")).toBeGreaterThan(tensionEven("clip_frame_quick"));
  });
});

describe("setupSpeed", () => {
  it("clip frame quick fastest setup", () => {
    expect(setupSpeed("clip_frame_quick")).toBeGreaterThan(setupSpeed("pin_frame_tension"));
  });
});

describe("sizeRange", () => {
  it("adjustable frame flex widest size range", () => {
    expect(sizeRange("adjustable_frame_flex")).toBeGreaterThan(sizeRange("hoop_frame_round"));
  });
});

describe("portability", () => {
  it("hoop frame round most portable", () => {
    expect(portability("hoop_frame_round")).toBeGreaterThan(portability("pin_frame_tension"));
  });
});

describe("frameCost", () => {
  it("adjustable frame flex most expensive", () => {
    expect(frameCost("adjustable_frame_flex")).toBeGreaterThan(frameCost("hoop_frame_round"));
  });
});

describe("adjustable", () => {
  it("adjustable frame flex is adjustable", () => {
    expect(adjustable("adjustable_frame_flex")).toBe(true);
  });
  it("fixed frame standard not adjustable", () => {
    expect(adjustable("fixed_frame_standard")).toBe(false);
  });
});

describe("reusable", () => {
  it("all silk frames are reusable", () => {
    expect(reusable("pin_frame_tension")).toBe(true);
  });
  it("hoop frame round is reusable", () => {
    expect(reusable("hoop_frame_round")).toBe(true);
  });
});

describe("mountMethod", () => {
  it("clip frame quick uses spring clip grip", () => {
    expect(mountMethod("clip_frame_quick")).toBe("spring_clip_grip");
  });
});

describe("bestUse", () => {
  it("fixed frame standard best for standard panel paint", () => {
    expect(bestUse("fixed_frame_standard")).toBe("standard_panel_paint");
  });
});

describe("silkFrames", () => {
  it("returns 5 types", () => {
    expect(silkFrames()).toHaveLength(5);
  });
});

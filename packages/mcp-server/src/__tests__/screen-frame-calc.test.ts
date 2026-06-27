import { describe, it, expect } from "vitest";
import {
  tensionHold, durability, setupSpeed, sizeRange,
  frameCost, retensionable, wooden, cornerStyle,
  bestUse, screenFrames,
} from "../screen-frame-calc.js";

describe("tensionHold", () => {
  it("retensionable frame pro best tension hold", () => {
    expect(tensionHold("retensionable_frame_pro")).toBeGreaterThan(tensionHold("wood_frame_budget"));
  });
});

describe("durability", () => {
  it("retensionable frame pro most durable", () => {
    expect(durability("retensionable_frame_pro")).toBeGreaterThan(durability("wood_frame_budget"));
  });
});

describe("setupSpeed", () => {
  it("roller frame quick fastest setup", () => {
    expect(setupSpeed("roller_frame_quick")).toBeGreaterThan(setupSpeed("retensionable_frame_pro"));
  });
});

describe("sizeRange", () => {
  it("newman frame precision widest size range", () => {
    expect(sizeRange("newman_frame_precision")).toBeGreaterThan(sizeRange("wood_frame_budget"));
  });
});

describe("frameCost", () => {
  it("newman frame precision most expensive", () => {
    expect(frameCost("newman_frame_precision")).toBeGreaterThan(frameCost("wood_frame_budget"));
  });
});

describe("retensionable", () => {
  it("retensionable frame pro is retensionable", () => {
    expect(retensionable("retensionable_frame_pro")).toBe(true);
  });
  it("wood frame budget not retensionable", () => {
    expect(retensionable("wood_frame_budget")).toBe(false);
  });
});

describe("wooden", () => {
  it("wood frame budget is wooden", () => {
    expect(wooden("wood_frame_budget")).toBe(true);
  });
  it("aluminum frame light not wooden", () => {
    expect(wooden("aluminum_frame_light")).toBe(false);
  });
});

describe("cornerStyle", () => {
  it("roller frame quick uses roller bar snap", () => {
    expect(cornerStyle("roller_frame_quick")).toBe("roller_bar_snap");
  });
});

describe("bestUse", () => {
  it("aluminum frame light best for general screen print", () => {
    expect(bestUse("aluminum_frame_light")).toBe("general_screen_print");
  });
});

describe("screenFrames", () => {
  it("returns 5 types", () => {
    expect(screenFrames()).toHaveLength(5);
  });
});

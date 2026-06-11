import { describe, it, expect } from "vitest";
import {
  cutPrecision, curveFollow, bladeRange, controlFeel,
  fretCost, powered, forThick, frameDepth,
  bestUse, fretSawMarquetrys,
} from "../fret-saw-marquetry-calc.js";

describe("cutPrecision", () => {
  it("jeweler frame small most precise cut", () => {
    expect(cutPrecision("jeweler_frame_small")).toBeGreaterThan(cutPrecision("scroll_saw_electric"));
  });
});

describe("curveFollow", () => {
  it("jeweler frame small best curve follow", () => {
    expect(curveFollow("jeweler_frame_small")).toBeGreaterThan(curveFollow("scroll_saw_electric"));
  });
});

describe("bladeRange", () => {
  it("scroll saw electric best blade range", () => {
    expect(bladeRange("scroll_saw_electric")).toBeGreaterThan(bladeRange("jeweler_frame_small"));
  });
});

describe("controlFeel", () => {
  it("chevalet seat saw best control feel", () => {
    expect(controlFeel("chevalet_seat_saw")).toBeGreaterThan(controlFeel("scroll_saw_electric"));
  });
});

describe("fretCost", () => {
  it("chevalet seat saw most expensive", () => {
    expect(fretCost("chevalet_seat_saw")).toBeGreaterThan(fretCost("jeweler_frame_small"));
  });
});

describe("powered", () => {
  it("scroll saw electric is powered", () => {
    expect(powered("scroll_saw_electric")).toBe(true);
  });
  it("hand frame deep not powered", () => {
    expect(powered("hand_frame_deep")).toBe(false);
  });
});

describe("forThick", () => {
  it("chevalet seat saw is for thick", () => {
    expect(forThick("chevalet_seat_saw")).toBe(true);
  });
  it("hand frame deep not for thick", () => {
    expect(forThick("hand_frame_deep")).toBe(false);
  });
});

describe("frameDepth", () => {
  it("jeweler frame small has shallow 3 inch", () => {
    expect(frameDepth("jeweler_frame_small")).toBe("shallow_3_inch");
  });
});

describe("bestUse", () => {
  it("chevalet seat saw best for boulle packet cut", () => {
    expect(bestUse("chevalet_seat_saw")).toBe("boulle_packet_cut");
  });
});

describe("fretSawMarquetrys", () => {
  it("returns 5 types", () => {
    expect(fretSawMarquetrys()).toHaveLength(5);
  });
});

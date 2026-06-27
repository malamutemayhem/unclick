import { describe, it, expect } from "vitest";
import {
  splitEase, controlFine, durability, cordRange,
  fidCost, forThick, ergonomic, fidProfile,
  bestUse, plySplits,
} from "../ply-split-calc.js";

describe("splitEase", () => {
  it("bent tip fid easiest split", () => {
    expect(splitEase("bent_tip_fid")).toBeGreaterThan(splitEase("wood_point_fid"));
  });
});

describe("controlFine", () => {
  it("bent tip fid finest control", () => {
    expect(controlFine("bent_tip_fid")).toBeGreaterThan(controlFine("loop_end_fid"));
  });
});

describe("durability", () => {
  it("metal grip fid most durable", () => {
    expect(durability("metal_grip_fid")).toBeGreaterThan(durability("wood_point_fid"));
  });
});

describe("cordRange", () => {
  it("loop end fid widest cord range", () => {
    expect(cordRange("loop_end_fid")).toBeGreaterThan(cordRange("wood_point_fid"));
  });
});

describe("fidCost", () => {
  it("ergonomic handle fid most expensive", () => {
    expect(fidCost("ergonomic_handle_fid")).toBeGreaterThan(fidCost("wood_point_fid"));
  });
});

describe("forThick", () => {
  it("metal grip fid is for thick", () => {
    expect(forThick("metal_grip_fid")).toBe(true);
  });
  it("wood point fid not for thick", () => {
    expect(forThick("wood_point_fid")).toBe(false);
  });
});

describe("ergonomic", () => {
  it("ergonomic handle fid is ergonomic", () => {
    expect(ergonomic("ergonomic_handle_fid")).toBe(true);
  });
  it("metal grip fid not ergonomic", () => {
    expect(ergonomic("metal_grip_fid")).toBe(false);
  });
});

describe("fidProfile", () => {
  it("bent tip fid uses angled bent steel", () => {
    expect(fidProfile("bent_tip_fid")).toBe("angled_bent_steel");
  });
});

describe("bestUse", () => {
  it("metal grip fid best for general ply split", () => {
    expect(bestUse("metal_grip_fid")).toBe("general_ply_split");
  });
});

describe("plySplits", () => {
  it("returns 5 types", () => {
    expect(plySplits()).toHaveLength(5);
  });
});

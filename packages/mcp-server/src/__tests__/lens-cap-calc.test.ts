import { describe, it, expect } from "vitest";
import {
  protectionLevel, onOffSpeed, staySecure, universalFit,
  capCost, hasLeash, filterCompatible, capMaterial,
  bestLens, lensCaps,
} from "../lens-cap-calc.js";

describe("protectionLevel", () => {
  it("screw in metal best protection", () => {
    expect(protectionLevel("screw_in_metal")).toBeGreaterThan(protectionLevel("universal_silicone_stretch"));
  });
});

describe("onOffSpeed", () => {
  it("automatic retract fastest on off", () => {
    expect(onOffSpeed("automatic_retract")).toBeGreaterThan(onOffSpeed("screw_in_metal"));
  });
});

describe("staySecure", () => {
  it("screw in metal stays most secure", () => {
    expect(staySecure("screw_in_metal")).toBeGreaterThan(staySecure("universal_silicone_stretch"));
  });
});

describe("universalFit", () => {
  it("universal silicone stretch most universal fit", () => {
    expect(universalFit("universal_silicone_stretch")).toBeGreaterThan(universalFit("automatic_retract"));
  });
});

describe("capCost", () => {
  it("automatic retract most expensive", () => {
    expect(capCost("automatic_retract")).toBeGreaterThan(capCost("pinch_center_snap"));
  });
});

describe("hasLeash", () => {
  it("pinch center snap has leash", () => {
    expect(hasLeash("pinch_center_snap")).toBe(true);
  });
  it("snap on rim edge does not", () => {
    expect(hasLeash("snap_on_rim_edge")).toBe(false);
  });
});

describe("filterCompatible", () => {
  it("pinch center snap is filter compatible", () => {
    expect(filterCompatible("pinch_center_snap")).toBe(true);
  });
  it("screw in metal is not", () => {
    expect(filterCompatible("screw_in_metal")).toBe(false);
  });
});

describe("capMaterial", () => {
  it("automatic retract uses spring loaded iris blade", () => {
    expect(capMaterial("automatic_retract")).toBe("spring_loaded_iris_blade");
  });
});

describe("bestLens", () => {
  it("screw in metal best for premium lens long store", () => {
    expect(bestLens("screw_in_metal")).toBe("premium_lens_long_store");
  });
});

describe("lensCaps", () => {
  it("returns 5 types", () => {
    expect(lensCaps()).toHaveLength(5);
  });
});

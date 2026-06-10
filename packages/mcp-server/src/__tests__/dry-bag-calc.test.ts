import { describe, it, expect } from "vitest";
import {
  waterproofRating, packWeight, durability, volumeRange,
  bagCost, submersible, seeThrough, sealMethod,
  bestActivity, dryBags,
} from "../dry-bag-calc.js";

describe("waterproofRating", () => {
  it("roll top pvc heavy best waterproof", () => {
    expect(waterproofRating("roll_top_pvc_heavy")).toBeGreaterThan(waterproofRating("ultralight_sil_nylon"));
  });
});

describe("packWeight", () => {
  it("ultralight sil nylon lightest", () => {
    expect(packWeight("ultralight_sil_nylon")).toBeGreaterThan(packWeight("roll_top_pvc_heavy"));
  });
});

describe("durability", () => {
  it("roll top pvc heavy most durable", () => {
    expect(durability("roll_top_pvc_heavy")).toBeGreaterThan(durability("ultralight_sil_nylon"));
  });
});

describe("volumeRange", () => {
  it("roll top pvc heavy most volume range", () => {
    expect(volumeRange("roll_top_pvc_heavy")).toBeGreaterThan(volumeRange("clear_window_organizer"));
  });
});

describe("bagCost", () => {
  it("backpack harness combo most expensive", () => {
    expect(bagCost("backpack_harness_combo")).toBeGreaterThan(bagCost("clear_window_organizer"));
  });
});

describe("submersible", () => {
  it("roll top pvc heavy is submersible", () => {
    expect(submersible("roll_top_pvc_heavy")).toBe(true);
  });
  it("ultralight sil nylon is not submersible", () => {
    expect(submersible("ultralight_sil_nylon")).toBe(false);
  });
});

describe("seeThrough", () => {
  it("clear window organizer is see through", () => {
    expect(seeThrough("clear_window_organizer")).toBe(true);
  });
  it("roll top pvc heavy is not see through", () => {
    expect(seeThrough("roll_top_pvc_heavy")).toBe(false);
  });
});

describe("sealMethod", () => {
  it("compression valve pack uses roll top purge valve", () => {
    expect(sealMethod("compression_valve_pack")).toBe("roll_top_purge_valve");
  });
});

describe("bestActivity", () => {
  it("roll top pvc heavy best for kayak river rafting", () => {
    expect(bestActivity("roll_top_pvc_heavy")).toBe("kayak_river_rafting");
  });
});

describe("dryBags", () => {
  it("returns 5 types", () => {
    expect(dryBags()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  tensileStrength, tempResist, reusability, installSpeed,
  tieCost, reusable, forOutdoor, material,
  bestUse, cableTies,
} from "../cable-tie-calc.js";

describe("tensileStrength", () => {
  it("stainless steel band highest tensile strength", () => {
    expect(tensileStrength("stainless_steel_band")).toBeGreaterThan(tensileStrength("reusable_velcro_wrap"));
  });
});

describe("tempResist", () => {
  it("stainless steel band best temp resistance", () => {
    expect(tempResist("stainless_steel_band")).toBeGreaterThan(tempResist("reusable_velcro_wrap"));
  });
});

describe("reusability", () => {
  it("reusable velcro wrap most reusable", () => {
    expect(reusability("reusable_velcro_wrap")).toBeGreaterThan(reusability("nylon_standard_lock"));
  });
});

describe("installSpeed", () => {
  it("nylon standard lock fastest install", () => {
    expect(installSpeed("nylon_standard_lock")).toBeGreaterThan(installSpeed("stainless_steel_band"));
  });
});

describe("tieCost", () => {
  it("stainless steel band most expensive", () => {
    expect(tieCost("stainless_steel_band")).toBeGreaterThan(tieCost("nylon_standard_lock"));
  });
});

describe("reusable", () => {
  it("reusable velcro wrap is reusable", () => {
    expect(reusable("reusable_velcro_wrap")).toBe(true);
  });
  it("nylon standard lock not reusable", () => {
    expect(reusable("nylon_standard_lock")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("stainless steel band is for outdoor", () => {
    expect(forOutdoor("stainless_steel_band")).toBe(true);
  });
  it("nylon standard lock not for outdoor", () => {
    expect(forOutdoor("nylon_standard_lock")).toBe(false);
  });
});

describe("material", () => {
  it("reusable velcro wrap uses polyester hook loop", () => {
    expect(material("reusable_velcro_wrap")).toBe("polyester_hook_loop");
  });
});

describe("bestUse", () => {
  it("nylon standard lock best for general wire bundle", () => {
    expect(bestUse("nylon_standard_lock")).toBe("general_wire_bundle");
  });
});

describe("cableTies", () => {
  it("returns 5 types", () => {
    expect(cableTies()).toHaveLength(5);
  });
});

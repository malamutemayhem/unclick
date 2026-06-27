import { describe, it, expect } from "vitest";
import {
  gripPrecision, springSafe, adjustFine, handleErgon,
  colletCost, selfClosing, forPinning, jawProfile,
  bestUse, hairspringCollets,
} from "../hairspring-collet-calc.js";

describe("gripPrecision", () => {
  it("spring tweezers fine most precise grip", () => {
    expect(gripPrecision("spring_tweezers_fine")).toBeGreaterThan(gripPrecision("stud_carrier_hold"));
  });
});

describe("springSafe", () => {
  it("spring tweezers fine safest", () => {
    expect(springSafe("spring_tweezers_fine")).toBeGreaterThan(springSafe("vibrating_tool_adjust"));
  });
});

describe("adjustFine", () => {
  it("vibrating tool adjust finest adjust", () => {
    expect(adjustFine("vibrating_tool_adjust")).toBeGreaterThan(adjustFine("collet_opener_lever"));
  });
});

describe("handleErgon", () => {
  it("stud carrier hold best ergonomics", () => {
    expect(handleErgon("stud_carrier_hold")).toBeGreaterThan(handleErgon("spring_tweezers_fine"));
  });
});

describe("colletCost", () => {
  it("vibrating tool adjust most expensive", () => {
    expect(colletCost("vibrating_tool_adjust")).toBeGreaterThan(colletCost("collet_opener_lever"));
  });
});

describe("selfClosing", () => {
  it("spring tweezers fine is self closing", () => {
    expect(selfClosing("spring_tweezers_fine")).toBe(true);
  });
  it("collet opener lever not self closing", () => {
    expect(selfClosing("collet_opener_lever")).toBe(false);
  });
});

describe("forPinning", () => {
  it("pinning vice clamp is for pinning", () => {
    expect(forPinning("pinning_vice_clamp")).toBe(true);
  });
  it("collet opener lever not for pinning", () => {
    expect(forPinning("collet_opener_lever")).toBe(false);
  });
});

describe("jawProfile", () => {
  it("vibrating tool adjust uses vibrate arm tip", () => {
    expect(jawProfile("vibrating_tool_adjust")).toBe("vibrate_arm_tip");
  });
});

describe("bestUse", () => {
  it("spring tweezers fine best for spring coil handle", () => {
    expect(bestUse("spring_tweezers_fine")).toBe("spring_coil_handle");
  });
});

describe("hairspringCollets", () => {
  it("returns 5 types", () => {
    expect(hairspringCollets()).toHaveLength(5);
  });
});

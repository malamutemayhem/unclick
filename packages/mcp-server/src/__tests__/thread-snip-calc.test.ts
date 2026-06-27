import { describe, it, expect } from "vitest";
import {
  cutPrecision, easeOfUse, portability, bladeLife,
  snipCost, sealsCut, wearable, bladeStyle,
  bestTask, threadSnips,
} from "../thread-snip-calc.js";

describe("cutPrecision", () => {
  it("electric heated seal most precise cut", () => {
    expect(cutPrecision("electric_heated_seal")).toBeGreaterThan(cutPrecision("pendant_neck_hang"));
  });
});

describe("easeOfUse", () => {
  it("spring action squeeze easiest to use", () => {
    expect(easeOfUse("spring_action_squeeze")).toBeGreaterThan(easeOfUse("electric_heated_seal"));
  });
});

describe("portability", () => {
  it("pendant neck hang most portable", () => {
    expect(portability("pendant_neck_hang")).toBeGreaterThan(portability("electric_heated_seal"));
  });
});

describe("bladeLife", () => {
  it("electric heated seal longest blade life", () => {
    expect(bladeLife("electric_heated_seal")).toBeGreaterThan(bladeLife("retractable_badge_reel"));
  });
});

describe("snipCost", () => {
  it("electric heated seal most expensive", () => {
    expect(snipCost("electric_heated_seal")).toBeGreaterThan(snipCost("spring_action_squeeze"));
  });
});

describe("sealsCut", () => {
  it("electric heated seal seals cut", () => {
    expect(sealsCut("electric_heated_seal")).toBe(true);
  });
  it("spring action squeeze does not seal cut", () => {
    expect(sealsCut("spring_action_squeeze")).toBe(false);
  });
});

describe("wearable", () => {
  it("pendant neck hang is wearable", () => {
    expect(wearable("pendant_neck_hang")).toBe(true);
  });
  it("scissor blade mini is not wearable", () => {
    expect(wearable("scissor_blade_mini")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("spring action squeeze uses curved spring steel", () => {
    expect(bladeStyle("spring_action_squeeze")).toBe("curved_spring_steel");
  });
});

describe("bestTask", () => {
  it("pendant neck hang best for travel sewing kit", () => {
    expect(bestTask("pendant_neck_hang")).toBe("travel_sewing_kit");
  });
});

describe("threadSnips", () => {
  it("returns 5 types", () => {
    expect(threadSnips()).toHaveLength(5);
  });
});

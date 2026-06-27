import { describe, it, expect } from "vitest";
import {
  severity, freqDepend, predictability, mitigation,
  xtCost, shieldHelps, forDiffPair, mechanism,
  bestUse, crosstalkModes,
} from "../crosstalk-mode-calc.js";

describe("severity", () => {
  it("power sum psxt most severe", () => {
    expect(severity("power_sum_psxt")).toBeGreaterThan(severity("differential_skew"));
  });
});

describe("freqDepend", () => {
  it("differential skew most frequency dependent", () => {
    expect(freqDepend("differential_skew")).toBeGreaterThan(freqDepend("near_end_next"));
  });
});

describe("predictability", () => {
  it("differential skew most predictable", () => {
    expect(predictability("differential_skew")).toBeGreaterThan(predictability("alien_crosstalk"));
  });
});

describe("mitigation", () => {
  it("differential skew easiest to mitigate", () => {
    expect(mitigation("differential_skew")).toBeGreaterThan(mitigation("alien_crosstalk"));
  });
});

describe("xtCost", () => {
  it("alien crosstalk most expensive to fix", () => {
    expect(xtCost("alien_crosstalk")).toBeGreaterThan(xtCost("differential_skew"));
  });
});

describe("shieldHelps", () => {
  it("near end next shielding helps", () => {
    expect(shieldHelps("near_end_next")).toBe(true);
  });
  it("power sum psxt shielding does not help", () => {
    expect(shieldHelps("power_sum_psxt")).toBe(false);
  });
});

describe("forDiffPair", () => {
  it("differential skew for diff pair", () => {
    expect(forDiffPair("differential_skew")).toBe(true);
  });
  it("alien crosstalk not for diff pair", () => {
    expect(forDiffPair("alien_crosstalk")).toBe(false);
  });
});

describe("mechanism", () => {
  it("alien crosstalk uses cable to cable radiated", () => {
    expect(mechanism("alien_crosstalk")).toBe("cable_to_cable_radiated");
  });
});

describe("bestUse", () => {
  it("differential skew best for usb4 lane match route", () => {
    expect(bestUse("differential_skew")).toBe("usb4_lane_match_route");
  });
});

describe("crosstalkModes", () => {
  it("returns 5 types", () => {
    expect(crosstalkModes()).toHaveLength(5);
  });
});

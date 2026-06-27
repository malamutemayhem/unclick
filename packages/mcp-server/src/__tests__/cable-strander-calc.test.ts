import { describe, it, expect } from "vitest";
import {
  strandPrecision, throughput, layLength, wireCount,
  csCost_, highSpeed, forPower, stranderConfig,
  bestUse, cableStranderTypes,
} from "../cable-strander-calc.js";

describe("strandPrecision", () => {
  it("tubular strander best strand precision", () => {
    expect(strandPrecision("tubular_strander")).toBeGreaterThan(strandPrecision("skip_strander"));
  });
});

describe("throughput", () => {
  it("drum twister highest throughput", () => {
    expect(throughput("drum_twister")).toBeGreaterThan(throughput("skip_strander"));
  });
});

describe("layLength", () => {
  it("tubular strander best lay length", () => {
    expect(layLength("tubular_strander")).toBeGreaterThan(layLength("planetary_cage"));
  });
});

describe("wireCount", () => {
  it("rigid frame highest wire count", () => {
    expect(wireCount("rigid_frame")).toBeGreaterThan(wireCount("drum_twister"));
  });
});

describe("csCost_", () => {
  it("rigid frame most expensive", () => {
    expect(csCost_("rigid_frame")).toBeGreaterThan(csCost_("skip_strander"));
  });
});

describe("highSpeed", () => {
  it("tubular strander is high speed", () => {
    expect(highSpeed("tubular_strander")).toBe(true);
  });
  it("rigid frame not high speed", () => {
    expect(highSpeed("rigid_frame")).toBe(false);
  });
});

describe("forPower", () => {
  it("tubular strander for power cable", () => {
    expect(forPower("tubular_strander")).toBe(true);
  });
  it("planetary cage not for power", () => {
    expect(forPower("planetary_cage")).toBe(false);
  });
});

describe("stranderConfig", () => {
  it("drum twister uses double twist one rotation two twist fast", () => {
    expect(stranderConfig("drum_twister")).toBe("drum_twister_strander_double_twist_one_rotation_two_twist_fast");
  });
});

describe("bestUse", () => {
  it("skip strander for submarine cable alternating lay multi layer armor", () => {
    expect(bestUse("skip_strander")).toBe("submarine_cable_skip_strander_alternating_lay_multi_layer_armor");
  });
});

describe("cableStranderTypes", () => {
  it("returns 5 types", () => {
    expect(cableStranderTypes()).toHaveLength(5);
  });
});

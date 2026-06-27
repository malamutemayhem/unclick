import { describe, it, expect } from "vitest";
import {
  bandwidth, maxResolution, maxLength, durability,
  cableCost, supportsArc, supportsVrr, shieldType,
  bestUse, hdmiCables,
} from "../hdmi-cable-calc.js";

describe("bandwidth", () => {
  it("ultra high speed 8k best bandwidth", () => {
    expect(bandwidth("ultra_high_speed_8k")).toBeGreaterThan(bandwidth("standard_1080p_basic"));
  });
});

describe("maxResolution", () => {
  it("ultra high speed 8k best resolution", () => {
    expect(maxResolution("ultra_high_speed_8k")).toBeGreaterThan(maxResolution("high_speed_4k_hdr"));
  });
});

describe("maxLength", () => {
  it("fiber optic long run longest", () => {
    expect(maxLength("fiber_optic_long_run")).toBeGreaterThan(maxLength("ultra_high_speed_8k"));
  });
});

describe("durability", () => {
  it("ultra high speed 8k most durable", () => {
    expect(durability("ultra_high_speed_8k")).toBeGreaterThan(durability("micro_hdmi_adapter"));
  });
});

describe("cableCost", () => {
  it("fiber optic long run most expensive", () => {
    expect(cableCost("fiber_optic_long_run")).toBeGreaterThan(cableCost("standard_1080p_basic"));
  });
});

describe("supportsArc", () => {
  it("high speed 4k hdr supports arc", () => {
    expect(supportsArc("high_speed_4k_hdr")).toBe(true);
  });
  it("standard 1080p basic does not support arc", () => {
    expect(supportsArc("standard_1080p_basic")).toBe(false);
  });
});

describe("supportsVrr", () => {
  it("ultra high speed 8k supports vrr", () => {
    expect(supportsVrr("ultra_high_speed_8k")).toBe(true);
  });
  it("high speed 4k hdr does not support vrr", () => {
    expect(supportsVrr("high_speed_4k_hdr")).toBe(false);
  });
});

describe("shieldType", () => {
  it("fiber optic long run uses optical fiber core", () => {
    expect(shieldType("fiber_optic_long_run")).toBe("optical_fiber_core");
  });
});

describe("bestUse", () => {
  it("ultra high speed 8k best for gaming 8k high refresh", () => {
    expect(bestUse("ultra_high_speed_8k")).toBe("gaming_8k_high_refresh");
  });
});

describe("hdmiCables", () => {
  it("returns 5 types", () => {
    expect(hdmiCables()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  contrast, brightness, responseTime, colorAccuracy,
  dispCost, selfEmissive, forHdr, backlight,
  bestUse, displayTechs,
} from "../display-tech-calc.js";

describe("contrast", () => {
  it("amoled ltpo highest contrast", () => {
    expect(contrast("amoled_ltpo")).toBeGreaterThan(contrast("ips_lcd"));
  });
});

describe("brightness", () => {
  it("microled direct brightest", () => {
    expect(brightness("microled_direct")).toBeGreaterThan(brightness("va_lcd"));
  });
});

describe("responseTime", () => {
  it("amoled ltpo fastest response", () => {
    expect(responseTime("amoled_ltpo")).toBeGreaterThan(responseTime("va_lcd"));
  });
});

describe("colorAccuracy", () => {
  it("ips lcd most color accurate", () => {
    expect(colorAccuracy("ips_lcd")).toBeGreaterThan(colorAccuracy("va_lcd"));
  });
});

describe("dispCost", () => {
  it("microled direct most expensive", () => {
    expect(dispCost("microled_direct")).toBeGreaterThan(dispCost("va_lcd"));
  });
});

describe("selfEmissive", () => {
  it("amoled ltpo is self emissive", () => {
    expect(selfEmissive("amoled_ltpo")).toBe(true);
  });
  it("ips lcd not self emissive", () => {
    expect(selfEmissive("ips_lcd")).toBe(false);
  });
});

describe("forHdr", () => {
  it("microled direct for hdr", () => {
    expect(forHdr("microled_direct")).toBe(true);
  });
  it("eink electrophoretic not for hdr", () => {
    expect(forHdr("eink_electrophoretic")).toBe(false);
  });
});

describe("backlight", () => {
  it("amoled ltpo uses none self emissive", () => {
    expect(backlight("amoled_ltpo")).toBe("none_self_emissive");
  });
});

describe("bestUse", () => {
  it("eink electrophoretic best for ereader low power", () => {
    expect(bestUse("eink_electrophoretic")).toBe("ereader_low_power");
  });
});

describe("displayTechs", () => {
  it("returns 5 types", () => {
    expect(displayTechs()).toHaveLength(5);
  });
});

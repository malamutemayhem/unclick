import { describe, it, expect } from "vitest";
import {
  lightPower, recycleTime, lightQuality, portabilityScore,
  unitCost, requiresAcPower, ttlCapable, mountType,
  bestApplication, flashUnits,
} from "../flash-unit-calc.js";

describe("lightPower", () => {
  it("studio strobe most powerful", () => {
    expect(lightPower("studio_strobe")).toBeGreaterThan(lightPower("built_in_popup"));
  });
});

describe("recycleTime", () => {
  it("studio strobe fastest recycle", () => {
    expect(recycleTime("studio_strobe")).toBeGreaterThan(recycleTime("built_in_popup"));
  });
});

describe("lightQuality", () => {
  it("studio strobe best quality", () => {
    expect(lightQuality("studio_strobe")).toBeGreaterThan(lightQuality("built_in_popup"));
  });
});

describe("portabilityScore", () => {
  it("built in popup most portable", () => {
    expect(portabilityScore("built_in_popup")).toBeGreaterThan(portabilityScore("studio_strobe"));
  });
});

describe("unitCost", () => {
  it("studio strobe most expensive", () => {
    expect(unitCost("studio_strobe")).toBeGreaterThan(unitCost("hotshoe_speedlight"));
  });
});

describe("requiresAcPower", () => {
  it("studio strobe requires ac power", () => {
    expect(requiresAcPower("studio_strobe")).toBe(true);
  });
  it("hotshoe speedlight does not", () => {
    expect(requiresAcPower("hotshoe_speedlight")).toBe(false);
  });
});

describe("ttlCapable", () => {
  it("hotshoe speedlight is ttl capable", () => {
    expect(ttlCapable("hotshoe_speedlight")).toBe(true);
  });
  it("studio strobe is not", () => {
    expect(ttlCapable("studio_strobe")).toBe(false);
  });
});

describe("mountType", () => {
  it("ring flash uses lens barrel ring adapter", () => {
    expect(mountType("ring_flash")).toBe("lens_barrel_ring_adapter");
  });
});

describe("bestApplication", () => {
  it("ring flash for macro beauty even light", () => {
    expect(bestApplication("ring_flash")).toBe("macro_beauty_even_light");
  });
});

describe("flashUnits", () => {
  it("returns 5 types", () => {
    expect(flashUnits()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  laminateQuality, speed, maxWidth, compactSize,
  laminatorCost, noWarmUp, twoSided, feedMethod,
  bestUse, laminators,
} from "../laminator-calc.js";

describe("laminateQuality", () => {
  it("roll wide format best quality", () => {
    expect(laminateQuality("roll_wide_format")).toBeGreaterThan(laminateQuality("pouch_personal_basic"));
  });
});

describe("speed", () => {
  it("roll wide format fastest", () => {
    expect(speed("roll_wide_format")).toBeGreaterThan(speed("pouch_personal_basic"));
  });
});

describe("maxWidth", () => {
  it("roll wide format widest", () => {
    expect(maxWidth("roll_wide_format")).toBeGreaterThan(maxWidth("thermal_id_card"));
  });
});

describe("compactSize", () => {
  it("pouch personal basic most compact", () => {
    expect(compactSize("pouch_personal_basic")).toBeGreaterThan(compactSize("roll_wide_format"));
  });
});

describe("laminatorCost", () => {
  it("roll wide format most expensive", () => {
    expect(laminatorCost("roll_wide_format")).toBeGreaterThan(laminatorCost("pouch_personal_basic"));
  });
});

describe("noWarmUp", () => {
  it("cold adhesive press needs no warm up", () => {
    expect(noWarmUp("cold_adhesive_press")).toBe(true);
  });
  it("pouch personal basic does", () => {
    expect(noWarmUp("pouch_personal_basic")).toBe(false);
  });
});

describe("twoSided", () => {
  it("pouch personal basic is two sided", () => {
    expect(twoSided("pouch_personal_basic")).toBe(true);
  });
  it("cold adhesive press is not", () => {
    expect(twoSided("cold_adhesive_press")).toBe(false);
  });
});

describe("feedMethod", () => {
  it("cold adhesive press uses pressure adhesive cold", () => {
    expect(feedMethod("cold_adhesive_press")).toBe("pressure_adhesive_cold");
  });
});

describe("bestUse", () => {
  it("thermal id card best for id badge membership card", () => {
    expect(bestUse("thermal_id_card")).toBe("id_badge_membership_card");
  });
});

describe("laminators", () => {
  it("returns 5 types", () => {
    expect(laminators()).toHaveLength(5);
  });
});

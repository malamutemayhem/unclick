import { describe, it, expect } from "vitest";
import {
  cutPrecision, visibility, automation, compliance,
  ssCost, locked, forScotch, safeConfig,
  bestUse, spiritSafeTypes,
} from "../spirit-safe-calc.js";

describe("cutPrecision", () => {
  it("digital inline best cut precision", () => {
    expect(cutPrecision("digital_inline")).toBeGreaterThan(cutPrecision("traditional_brass"));
  });
});

describe("visibility", () => {
  it("glass observation best visibility", () => {
    expect(visibility("glass_observation")).toBeGreaterThan(visibility("digital_inline"));
  });
});

describe("automation", () => {
  it("digital inline highest automation", () => {
    expect(automation("digital_inline")).toBeGreaterThan(automation("traditional_brass"));
  });
});

describe("compliance", () => {
  it("traditional brass highest compliance", () => {
    expect(compliance("traditional_brass")).toBeGreaterThan(compliance("digital_inline"));
  });
});

describe("ssCost", () => {
  it("digital inline most expensive", () => {
    expect(ssCost("digital_inline")).toBeGreaterThan(ssCost("glass_observation"));
  });
});

describe("locked", () => {
  it("traditional brass is locked", () => {
    expect(locked("traditional_brass")).toBe(true);
  });
  it("automated sensor not locked", () => {
    expect(locked("automated_sensor")).toBe(false);
  });
});

describe("forScotch", () => {
  it("traditional brass for scotch", () => {
    expect(forScotch("traditional_brass")).toBe(true);
  });
  it("digital inline not for scotch", () => {
    expect(forScotch("digital_inline")).toBe(false);
  });
});

describe("safeConfig", () => {
  it("multi stream uses manifold divert valve", () => {
    expect(safeConfig("multi_stream")).toBe("multi_stream_spirit_safe_multiple_still_manifold_divert_valve");
  });
});

describe("bestUse", () => {
  it("automated sensor for modern distillery", () => {
    expect(bestUse("automated_sensor")).toBe("modern_distillery_automated_sensor_density_meter_auto_cut_point");
  });
});

describe("spiritSafeTypes", () => {
  it("returns 5 types", () => {
    expect(spiritSafeTypes()).toHaveLength(5);
  });
});

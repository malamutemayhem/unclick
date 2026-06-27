import { describe, it, expect } from "vitest";
import {
  tensile, shear, vibrationResist, installSpeed,
  ftCost, removable, forThinSheet, drive,
  bestUse, fastenerTypes,
} from "../fastener-type-calc.js";

describe("tensile", () => {
  it("hex bolt highest tensile", () => {
    expect(tensile("hex_bolt_grade_8")).toBeGreaterThan(tensile("self_tapping_sheet"));
  });
});

describe("shear", () => {
  it("hex bolt highest shear", () => {
    expect(shear("hex_bolt_grade_8")).toBeGreaterThan(shear("rivet_blind_pop"));
  });
});

describe("vibrationResist", () => {
  it("threaded insert best vibration resist", () => {
    expect(vibrationResist("threaded_insert_helicoil")).toBeGreaterThan(vibrationResist("self_tapping_sheet"));
  });
});

describe("installSpeed", () => {
  it("self tapping fastest install", () => {
    expect(installSpeed("self_tapping_sheet")).toBeGreaterThan(installSpeed("threaded_insert_helicoil"));
  });
});

describe("ftCost", () => {
  it("threaded insert most expensive", () => {
    expect(ftCost("threaded_insert_helicoil")).toBeGreaterThan(ftCost("self_tapping_sheet"));
  });
});

describe("removable", () => {
  it("hex bolt is removable", () => {
    expect(removable("hex_bolt_grade_8")).toBe(true);
  });
  it("rivet not removable", () => {
    expect(removable("rivet_blind_pop")).toBe(false);
  });
});

describe("forThinSheet", () => {
  it("self tapping for thin sheet", () => {
    expect(forThinSheet("self_tapping_sheet")).toBe(true);
  });
  it("hex bolt not for thin sheet", () => {
    expect(forThinSheet("hex_bolt_grade_8")).toBe(false);
  });
});

describe("drive", () => {
  it("threaded insert uses tang drive coil wind", () => {
    expect(drive("threaded_insert_helicoil")).toBe("tang_drive_coil_wind");
  });
});

describe("bestUse", () => {
  it("rivet best for aircraft skin panel", () => {
    expect(bestUse("rivet_blind_pop")).toBe("aircraft_skin_panel_permanent");
  });
});

describe("fastenerTypes", () => {
  it("returns 5 types", () => {
    expect(fastenerTypes()).toHaveLength(5);
  });
});

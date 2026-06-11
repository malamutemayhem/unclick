import { describe, it, expect } from "vitest";
import {
  placementSpeed, accuracy, feederCapacity, easeOfUse,
  machineCost, automated, forProduction, pickMethod,
  bestUse, pickPlaces,
} from "../pick-place-calc.js";

describe("placementSpeed", () => {
  it("chip shooter highest placement speed", () => {
    expect(placementSpeed("chip_shooter_high")).toBeGreaterThan(placementSpeed("manual_vacuum_pen"));
  });
});

describe("accuracy", () => {
  it("flexible multi head best accuracy", () => {
    expect(accuracy("flexible_multi_head")).toBeGreaterThan(accuracy("manual_vacuum_pen"));
  });
});

describe("feederCapacity", () => {
  it("chip shooter highest feeder capacity", () => {
    expect(feederCapacity("chip_shooter_high")).toBeGreaterThan(feederCapacity("manual_vacuum_pen"));
  });
});

describe("easeOfUse", () => {
  it("manual vacuum pen easiest to use", () => {
    expect(easeOfUse("manual_vacuum_pen")).toBeGreaterThan(easeOfUse("chip_shooter_high"));
  });
});

describe("machineCost", () => {
  it("chip shooter most expensive", () => {
    expect(machineCost("chip_shooter_high")).toBeGreaterThan(machineCost("manual_vacuum_pen"));
  });
});

describe("automated", () => {
  it("full auto inline is automated", () => {
    expect(automated("full_auto_inline")).toBe(true);
  });
  it("manual vacuum pen not automated", () => {
    expect(automated("manual_vacuum_pen")).toBe(false);
  });
});

describe("forProduction", () => {
  it("chip shooter is for production", () => {
    expect(forProduction("chip_shooter_high")).toBe(true);
  });
  it("semi auto desktop not for production", () => {
    expect(forProduction("semi_auto_desktop")).toBe(false);
  });
});

describe("pickMethod", () => {
  it("chip shooter uses rotary high speed", () => {
    expect(pickMethod("chip_shooter_high")).toBe("rotary_high_speed");
  });
});

describe("bestUse", () => {
  it("flexible multi head best for mixed fine pitch line", () => {
    expect(bestUse("flexible_multi_head")).toBe("mixed_fine_pitch_line");
  });
});

describe("pickPlaces", () => {
  it("returns 5 types", () => {
    expect(pickPlaces()).toHaveLength(5);
  });
});

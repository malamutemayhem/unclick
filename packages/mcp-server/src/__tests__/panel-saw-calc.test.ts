import { describe, it, expect } from "vitest";
import {
  speed, cutQuality, panelCapacity, automation,
  psCost, batchCapable, forMelamine, cutting,
  bestUse, panelSawTypes,
} from "../panel-saw-calc.js";

describe("speed", () => {
  it("beam saw fastest", () => {
    expect(speed("beam_saw")).toBeGreaterThan(speed("wall_saw"));
  });
});

describe("cutQuality", () => {
  it("sliding table best cut quality", () => {
    expect(cutQuality("sliding_table")).toBeGreaterThan(cutQuality("wall_saw"));
  });
});

describe("panelCapacity", () => {
  it("beam saw highest panel capacity", () => {
    expect(panelCapacity("beam_saw")).toBeGreaterThan(panelCapacity("sliding_table"));
  });
});

describe("automation", () => {
  it("beam saw most automated", () => {
    expect(automation("beam_saw")).toBeGreaterThan(automation("wall_saw"));
  });
});

describe("psCost", () => {
  it("beam saw most expensive", () => {
    expect(psCost("beam_saw")).toBeGreaterThan(psCost("wall_saw"));
  });
});

describe("batchCapable", () => {
  it("beam saw is batch capable", () => {
    expect(batchCapable("beam_saw")).toBe(true);
  });
  it("sliding table not batch capable", () => {
    expect(batchCapable("sliding_table")).toBe(false);
  });
});

describe("forMelamine", () => {
  it("beam saw for melamine", () => {
    expect(forMelamine("beam_saw")).toBe(true);
  });
  it("wall saw not for melamine", () => {
    expect(forMelamine("wall_saw")).toBe(false);
  });
});

describe("cutting", () => {
  it("cnc nesting uses router nesting software", () => {
    expect(cutting("cnc_nesting")).toBe("cnc_router_nesting_software_optimize_part_layout_vacuum");
  });
});

describe("bestUse", () => {
  it("vertical panel for small shop", () => {
    expect(bestUse("vertical_panel")).toBe("small_shop_limited_space_full_sheet_breakdown_vertical");
  });
});

describe("panelSawTypes", () => {
  it("returns 5 types", () => {
    expect(panelSawTypes()).toHaveLength(5);
  });
});

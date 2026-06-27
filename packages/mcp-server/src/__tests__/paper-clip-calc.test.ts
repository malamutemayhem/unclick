import { describe, it, expect } from "vitest";
import {
  gripStrength, pageCapacity, reusability, paperSafe,
  clipCost, colorCoded, rustProof, clipMaterial,
  bestUse, paperClips,
} from "../paper-clip-calc.js";

describe("gripStrength", () => {
  it("butterfly binder style strongest grip", () => {
    expect(gripStrength("butterfly_binder_style")).toBeGreaterThan(gripStrength("standard_wire_gem"));
  });
});

describe("pageCapacity", () => {
  it("butterfly binder style most pages", () => {
    expect(pageCapacity("butterfly_binder_style")).toBeGreaterThan(pageCapacity("standard_wire_gem"));
  });
});

describe("reusability", () => {
  it("butterfly binder style most reusable", () => {
    expect(reusability("butterfly_binder_style")).toBeGreaterThan(reusability("colored_vinyl_coated"));
  });
});

describe("paperSafe", () => {
  it("colored vinyl coated safest for paper", () => {
    expect(paperSafe("colored_vinyl_coated")).toBeGreaterThan(paperSafe("standard_wire_gem"));
  });
});

describe("clipCost", () => {
  it("magnetic dispenser set most expensive", () => {
    expect(clipCost("magnetic_dispenser_set")).toBeGreaterThan(clipCost("standard_wire_gem"));
  });
});

describe("colorCoded", () => {
  it("colored vinyl coated is color coded", () => {
    expect(colorCoded("colored_vinyl_coated")).toBe(true);
  });
  it("standard wire gem is not", () => {
    expect(colorCoded("standard_wire_gem")).toBe(false);
  });
});

describe("rustProof", () => {
  it("butterfly binder style is rust proof", () => {
    expect(rustProof("butterfly_binder_style")).toBe(true);
  });
  it("standard wire gem is not", () => {
    expect(rustProof("standard_wire_gem")).toBe(false);
  });
});

describe("clipMaterial", () => {
  it("colored vinyl coated uses vinyl coated wire", () => {
    expect(clipMaterial("colored_vinyl_coated")).toBe("vinyl_coated_wire");
  });
});

describe("bestUse", () => {
  it("jumbo smooth large best for thick report bundle", () => {
    expect(bestUse("jumbo_smooth_large")).toBe("thick_report_bundle");
  });
});

describe("paperClips", () => {
  it("returns 5 types", () => {
    expect(paperClips()).toHaveLength(5);
  });
});

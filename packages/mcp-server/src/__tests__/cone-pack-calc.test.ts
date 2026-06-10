import { describe, it, expect } from "vitest";
import {
  tempAccuracy, visibility, easeOfUse, rangeSpan,
  coneCost, selfStanding, reusable, coneBody,
  bestUse, conePacks,
} from "../cone-pack-calc.js";

describe("tempAccuracy", () => {
  it("pyrometric ring disc most accurate temp", () => {
    expect(tempAccuracy("pyrometric_ring_disc")).toBeGreaterThan(tempAccuracy("junior_cone_mini"));
  });
});

describe("visibility", () => {
  it("large cone free most visible", () => {
    expect(visibility("large_cone_free")).toBeGreaterThan(visibility("pyrometric_ring_disc"));
  });
});

describe("easeOfUse", () => {
  it("self support stand easiest to use", () => {
    expect(easeOfUse("self_support_stand")).toBeGreaterThan(easeOfUse("large_cone_free"));
  });
});

describe("rangeSpan", () => {
  it("small cone bar widest range span", () => {
    expect(rangeSpan("small_cone_bar")).toBeGreaterThan(rangeSpan("pyrometric_ring_disc"));
  });
});

describe("coneCost", () => {
  it("pyrometric ring disc most expensive", () => {
    expect(coneCost("pyrometric_ring_disc")).toBeGreaterThan(coneCost("small_cone_bar"));
  });
});

describe("selfStanding", () => {
  it("self support stand is self standing", () => {
    expect(selfStanding("self_support_stand")).toBe(true);
  });
  it("small cone bar not self standing", () => {
    expect(selfStanding("small_cone_bar")).toBe(false);
  });
});

describe("reusable", () => {
  it("pyrometric ring disc is reusable", () => {
    expect(reusable("pyrometric_ring_disc")).toBe(true);
  });
  it("small cone bar not reusable", () => {
    expect(reusable("small_cone_bar")).toBe(false);
  });
});

describe("coneBody", () => {
  it("small cone bar uses ceramic oxide blend", () => {
    expect(coneBody("small_cone_bar")).toBe("ceramic_oxide_blend");
  });
});

describe("bestUse", () => {
  it("small cone bar best for kiln sitter auto", () => {
    expect(bestUse("small_cone_bar")).toBe("kiln_sitter_auto");
  });
});

describe("conePacks", () => {
  it("returns 5 types", () => {
    expect(conePacks()).toHaveLength(5);
  });
});

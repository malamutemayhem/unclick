import { describe, it, expect } from "vitest";
import {
  weldQuality, speed, repeatability, sizeRange,
  owCost, autogenous, forSanitary, head,
  bestUse, orbitalWeldTypes,
} from "../orbital-weld-calc.js";

describe("weldQuality", () => {
  it("enclosed head highest weld quality", () => {
    expect(weldQuality("enclosed_head")).toBeGreaterThan(weldQuality("open_head"));
  });
});

describe("speed", () => {
  it("micro orbital fastest", () => {
    expect(speed("micro_orbital")).toBeGreaterThan(speed("multi_pass_heavy"));
  });
});

describe("repeatability", () => {
  it("enclosed head best repeatability", () => {
    expect(repeatability("enclosed_head")).toBeGreaterThan(repeatability("multi_pass_heavy"));
  });
});

describe("sizeRange", () => {
  it("multi pass heavy widest size range", () => {
    expect(sizeRange("multi_pass_heavy")).toBeGreaterThan(sizeRange("micro_orbital"));
  });
});

describe("owCost", () => {
  it("multi pass heavy most expensive", () => {
    expect(owCost("multi_pass_heavy")).toBeGreaterThan(owCost("open_head"));
  });
});

describe("autogenous", () => {
  it("enclosed head is autogenous", () => {
    expect(autogenous("enclosed_head")).toBe(true);
  });
  it("wire feed not autogenous", () => {
    expect(autogenous("wire_feed")).toBe(false);
  });
});

describe("forSanitary", () => {
  it("enclosed head for sanitary", () => {
    expect(forSanitary("enclosed_head")).toBe(true);
  });
  it("open head not for sanitary", () => {
    expect(forSanitary("open_head")).toBe(false);
  });
});

describe("head", () => {
  it("micro orbital uses miniature enclosed head", () => {
    expect(head("micro_orbital")).toBe("miniature_enclosed_head_fine_tube_1_6mm_precision_fusion");
  });
});

describe("bestUse", () => {
  it("wire feed for thick wall pipe nuclear", () => {
    expect(bestUse("wire_feed")).toBe("thick_wall_pipe_nuclear_oil_gas_pipeline_structural_weld");
  });
});

describe("orbitalWeldTypes", () => {
  it("returns 5 types", () => {
    expect(orbitalWeldTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  shrinkRatio, tempResist, flexibility, insulation,
  shrinkCost, adhesiveLined, forHighTemp, material,
  bestUse, heatShrinks,
} from "../heat-shrink-calc.js";

describe("shrinkRatio", () => {
  it("dual wall adhesive highest shrink ratio", () => {
    expect(shrinkRatio("dual_wall_adhesive")).toBeGreaterThan(shrinkRatio("ptfe_high_temp"));
  });
});

describe("tempResist", () => {
  it("ptfe high temp most heat resistant", () => {
    expect(tempResist("ptfe_high_temp")).toBeGreaterThan(tempResist("pvc_thin_wall"));
  });
});

describe("flexibility", () => {
  it("silicone flex rubber most flexible", () => {
    expect(flexibility("silicone_flex_rubber")).toBeGreaterThan(flexibility("ptfe_high_temp"));
  });
});

describe("insulation", () => {
  it("ptfe high temp best insulation", () => {
    expect(insulation("ptfe_high_temp")).toBeGreaterThan(insulation("pvc_thin_wall"));
  });
});

describe("shrinkCost", () => {
  it("ptfe high temp most expensive", () => {
    expect(shrinkCost("ptfe_high_temp")).toBeGreaterThan(shrinkCost("pvc_thin_wall"));
  });
});

describe("adhesiveLined", () => {
  it("dual wall adhesive is adhesive lined", () => {
    expect(adhesiveLined("dual_wall_adhesive")).toBe(true);
  });
  it("polyolefin standard not adhesive lined", () => {
    expect(adhesiveLined("polyolefin_standard")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("ptfe high temp is for high temp", () => {
    expect(forHighTemp("ptfe_high_temp")).toBe(true);
  });
  it("pvc thin wall not for high temp", () => {
    expect(forHighTemp("pvc_thin_wall")).toBe(false);
  });
});

describe("material", () => {
  it("silicone flex rubber uses silicone elastomer", () => {
    expect(material("silicone_flex_rubber")).toBe("silicone_elastomer");
  });
});

describe("bestUse", () => {
  it("dual wall adhesive best for waterproof splice seal", () => {
    expect(bestUse("dual_wall_adhesive")).toBe("waterproof_splice_seal");
  });
});

describe("heatShrinks", () => {
  it("returns 5 types", () => {
    expect(heatShrinks()).toHaveLength(5);
  });
});

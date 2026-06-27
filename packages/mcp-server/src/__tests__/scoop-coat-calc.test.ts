import { describe, it, expect } from "vitest";
import {
  coatEven, thicknessControl, speedCoat, sizeRange,
  coatCost, dualEdge, forDetail, troughStyle,
  bestUse, scoopCoats,
} from "../scoop-coat-calc.js";

describe("coatEven", () => {
  it("micro coat detail most even coat", () => {
    expect(coatEven("micro_coat_detail")).toBeGreaterThan(coatEven("wide_trough_large"));
  });
});

describe("thicknessControl", () => {
  it("micro coat detail best thickness control", () => {
    expect(thicknessControl("micro_coat_detail")).toBeGreaterThan(thicknessControl("round_edge_standard"));
  });
});

describe("speedCoat", () => {
  it("wide trough large fastest coat", () => {
    expect(speedCoat("wide_trough_large")).toBeGreaterThan(speedCoat("micro_coat_detail"));
  });
});

describe("sizeRange", () => {
  it("wide trough large widest size range", () => {
    expect(sizeRange("wide_trough_large")).toBeGreaterThan(sizeRange("micro_coat_detail"));
  });
});

describe("coatCost", () => {
  it("micro coat detail most expensive", () => {
    expect(coatCost("micro_coat_detail")).toBeGreaterThan(coatCost("round_edge_standard"));
  });
});

describe("dualEdge", () => {
  it("dual edge combo has dual edge", () => {
    expect(dualEdge("dual_edge_combo")).toBe(true);
  });
  it("sharp edge thin not dual edge", () => {
    expect(dualEdge("sharp_edge_thin")).toBe(false);
  });
});

describe("forDetail", () => {
  it("sharp edge thin is for detail", () => {
    expect(forDetail("sharp_edge_thin")).toBe(true);
  });
  it("round edge standard not for detail", () => {
    expect(forDetail("round_edge_standard")).toBe(false);
  });
});

describe("troughStyle", () => {
  it("dual edge combo uses dual profile trough", () => {
    expect(troughStyle("dual_edge_combo")).toBe("dual_profile_trough");
  });
});

describe("bestUse", () => {
  it("round edge standard best for general emulsion coat", () => {
    expect(bestUse("round_edge_standard")).toBe("general_emulsion_coat");
  });
});

describe("scoopCoats", () => {
  it("returns 5 types", () => {
    expect(scoopCoats()).toHaveLength(5);
  });
});

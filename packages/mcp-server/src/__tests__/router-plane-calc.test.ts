import { describe, it, expect } from "vitest";
import {
  depthControl, accessTight, stability, bladeVariety,
  planeCost, hasFence, oneHanded, bodyStyle,
  bestJoint, routerPlanes,
} from "../router-plane-calc.js";

describe("depthControl", () => {
  it("standard closed throat best depth control", () => {
    expect(depthControl("standard_closed_throat")).toBeGreaterThan(depthControl("vintage_womans_model"));
  });
});

describe("accessTight", () => {
  it("small palm router best tight access", () => {
    expect(accessTight("small_palm_router")).toBeGreaterThan(accessTight("large_open_throat"));
  });
});

describe("stability", () => {
  it("large open throat most stable", () => {
    expect(stability("large_open_throat")).toBeGreaterThan(stability("small_palm_router"));
  });
});

describe("bladeVariety", () => {
  it("plow fence guide most blade variety", () => {
    expect(bladeVariety("plow_fence_guide")).toBeGreaterThan(bladeVariety("small_palm_router"));
  });
});

describe("planeCost", () => {
  it("standard closed throat more expensive than small palm", () => {
    expect(planeCost("standard_closed_throat")).toBeGreaterThan(planeCost("small_palm_router"));
  });
});

describe("hasFence", () => {
  it("plow fence guide has fence", () => {
    expect(hasFence("plow_fence_guide")).toBe(true);
  });
  it("standard closed throat has no fence", () => {
    expect(hasFence("standard_closed_throat")).toBe(false);
  });
});

describe("oneHanded", () => {
  it("small palm router is one handed", () => {
    expect(oneHanded("small_palm_router")).toBe(true);
  });
  it("standard closed throat is not one handed", () => {
    expect(oneHanded("standard_closed_throat")).toBe(false);
  });
});

describe("bodyStyle", () => {
  it("small palm router uses bronze palm grip", () => {
    expect(bodyStyle("small_palm_router")).toBe("bronze_palm_grip");
  });
});

describe("bestJoint", () => {
  it("standard closed throat best for dado groove clean", () => {
    expect(bestJoint("standard_closed_throat")).toBe("dado_groove_clean");
  });
});

describe("routerPlanes", () => {
  it("returns 5 types", () => {
    expect(routerPlanes()).toHaveLength(5);
  });
});

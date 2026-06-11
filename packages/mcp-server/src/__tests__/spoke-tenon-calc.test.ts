import { describe, it, expect } from "vitest";
import {
  jointStrength, fitAccuracy, assemblyEase, repairAccess,
  tenonCost, hidden, wedged, jointProfile,
  bestUse, spokeTenons,
} from "../spoke-tenon-calc.js";

describe("jointStrength", () => {
  it("square tenon strong strongest joint", () => {
    expect(jointStrength("square_tenon_strong")).toBeGreaterThan(jointStrength("round_tenon_standard"));
  });
});

describe("fitAccuracy", () => {
  it("fox wedge hidden best fit accuracy", () => {
    expect(fitAccuracy("fox_wedge_hidden")).toBeGreaterThan(fitAccuracy("square_tenon_strong"));
  });
});

describe("assemblyEase", () => {
  it("round tenon standard easiest assembly", () => {
    expect(assemblyEase("round_tenon_standard")).toBeGreaterThan(assemblyEase("fox_wedge_hidden"));
  });
});

describe("repairAccess", () => {
  it("through tenon visible best repair access", () => {
    expect(repairAccess("through_tenon_visible")).toBeGreaterThan(repairAccess("fox_wedge_hidden"));
  });
});

describe("tenonCost", () => {
  it("fox wedge hidden most expensive", () => {
    expect(tenonCost("fox_wedge_hidden")).toBeGreaterThan(tenonCost("round_tenon_standard"));
  });
});

describe("hidden", () => {
  it("fox wedge hidden is hidden", () => {
    expect(hidden("fox_wedge_hidden")).toBe(true);
  });
  it("round tenon standard not hidden", () => {
    expect(hidden("round_tenon_standard")).toBe(false);
  });
});

describe("wedged", () => {
  it("tapered tenon wedge is wedged", () => {
    expect(wedged("tapered_tenon_wedge")).toBe(true);
  });
  it("round tenon standard not wedged", () => {
    expect(wedged("round_tenon_standard")).toBe(false);
  });
});

describe("jointProfile", () => {
  it("fox wedge hidden uses blind wedge expand", () => {
    expect(jointProfile("fox_wedge_hidden")).toBe("blind_wedge_expand");
  });
});

describe("bestUse", () => {
  it("round tenon standard best for general spoke joint", () => {
    expect(bestUse("round_tenon_standard")).toBe("general_spoke_joint");
  });
});

describe("spokeTenons", () => {
  it("returns 5 types", () => {
    expect(spokeTenons()).toHaveLength(5);
  });
});

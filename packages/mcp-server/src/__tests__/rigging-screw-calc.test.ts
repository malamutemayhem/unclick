import { describe, it, expect } from "vitest";
import {
  loadCapacity, adjustRange, corrosionResist, installEase,
  screwCost, toggleEnd, closedBody, endFitting,
  bestUse, riggingScrews,
} from "../rigging-screw-calc.js";

describe("loadCapacity", () => {
  it("bottle screw marine highest load capacity", () => {
    expect(loadCapacity("bottle_screw_marine")).toBeGreaterThan(loadCapacity("jaw_jaw_standard"));
  });
});

describe("adjustRange", () => {
  it("stud stud terminal best adjust range", () => {
    expect(adjustRange("stud_stud_terminal")).toBeGreaterThan(adjustRange("eye_eye_closed"));
  });
});

describe("corrosionResist", () => {
  it("bottle screw marine best corrosion resist", () => {
    expect(corrosionResist("bottle_screw_marine")).toBeGreaterThan(corrosionResist("jaw_jaw_standard"));
  });
});

describe("installEase", () => {
  it("jaw jaw standard easiest install", () => {
    expect(installEase("jaw_jaw_standard")).toBeGreaterThan(installEase("eye_eye_closed"));
  });
});

describe("screwCost", () => {
  it("bottle screw marine most expensive", () => {
    expect(screwCost("bottle_screw_marine")).toBeGreaterThan(screwCost("jaw_jaw_standard"));
  });
});

describe("toggleEnd", () => {
  it("fork fork toggle has toggle end", () => {
    expect(toggleEnd("fork_fork_toggle")).toBe(true);
  });
  it("jaw jaw standard no toggle end", () => {
    expect(toggleEnd("jaw_jaw_standard")).toBe(false);
  });
});

describe("closedBody", () => {
  it("eye eye closed has closed body", () => {
    expect(closedBody("eye_eye_closed")).toBe(true);
  });
  it("jaw jaw standard not closed body", () => {
    expect(closedBody("jaw_jaw_standard")).toBe(false);
  });
});

describe("endFitting", () => {
  it("stud stud terminal uses stud swage term", () => {
    expect(endFitting("stud_stud_terminal")).toBe("stud_swage_term");
  });
});

describe("bestUse", () => {
  it("bottle screw marine best for marine heavy stay", () => {
    expect(bestUse("bottle_screw_marine")).toBe("marine_heavy_stay");
  });
});

describe("riggingScrews", () => {
  it("returns 5 types", () => {
    expect(riggingScrews()).toHaveLength(5);
  });
});

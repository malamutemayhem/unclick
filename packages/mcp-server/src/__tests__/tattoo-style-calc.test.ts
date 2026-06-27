import { describe, it, expect } from "vitest";
import {
  detailLevel, colorRange, longevity, executionDifficulty,
  sessionTime, usesOutline, agesTouchUpNeeded, signatureElement,
  originRegion, tattooStyles,
} from "../tattoo-style-calc.js";

describe("detailLevel", () => {
  it("realism highest detail", () => {
    expect(detailLevel("realism")).toBeGreaterThan(detailLevel("traditional"));
  });
});

describe("colorRange", () => {
  it("realism widest color range", () => {
    expect(colorRange("realism")).toBeGreaterThan(colorRange("blackwork"));
  });
});

describe("longevity", () => {
  it("traditional lasts longest", () => {
    expect(longevity("traditional")).toBeGreaterThan(longevity("watercolor"));
  });
});

describe("executionDifficulty", () => {
  it("realism hardest to execute", () => {
    expect(executionDifficulty("realism")).toBeGreaterThan(executionDifficulty("traditional"));
  });
});

describe("sessionTime", () => {
  it("japanese longest sessions", () => {
    expect(sessionTime("japanese")).toBeGreaterThan(sessionTime("traditional"));
  });
});

describe("usesOutline", () => {
  it("traditional uses outline", () => {
    expect(usesOutline("traditional")).toBe(true);
  });
  it("realism does not", () => {
    expect(usesOutline("realism")).toBe(false);
  });
});

describe("agesTouchUpNeeded", () => {
  it("watercolor needs touch up", () => {
    expect(agesTouchUpNeeded("watercolor")).toBe(true);
  });
  it("traditional does not", () => {
    expect(agesTouchUpNeeded("traditional")).toBe(false);
  });
});

describe("signatureElement", () => {
  it("traditional is bold outlines flat color", () => {
    expect(signatureElement("traditional")).toBe("bold_outlines_flat_color");
  });
});

describe("originRegion", () => {
  it("japanese is irezumi edo period", () => {
    expect(originRegion("japanese")).toBe("irezumi_edo_period");
  });
});

describe("tattooStyles", () => {
  it("returns 5 styles", () => {
    expect(tattooStyles()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  coverageWidth, precision, tapeLength, portability,
  tapeCost, dryInstant, refillable, applicatorStyle,
  bestUse, correctionTapes,
} from "../correction-tape-calc.js";

describe("coverageWidth", () => {
  it("wide coverage fast widest coverage", () => {
    expect(coverageWidth("wide_coverage_fast")).toBeGreaterThan(coverageWidth("mini_pocket_compact"));
  });
});

describe("precision", () => {
  it("retractable pen style most precise", () => {
    expect(precision("retractable_pen_style")).toBeGreaterThan(precision("wide_coverage_fast"));
  });
});

describe("tapeLength", () => {
  it("refillable eco spool longest tape", () => {
    expect(tapeLength("refillable_eco_spool")).toBeGreaterThan(tapeLength("mini_pocket_compact"));
  });
});

describe("portability", () => {
  it("mini pocket compact most portable", () => {
    expect(portability("mini_pocket_compact")).toBeGreaterThan(portability("wide_coverage_fast"));
  });
});

describe("tapeCost", () => {
  it("refillable eco spool most expensive", () => {
    expect(tapeCost("refillable_eco_spool")).toBeGreaterThan(tapeCost("mini_pocket_compact"));
  });
});

describe("dryInstant", () => {
  it("all correction tapes are dry instant", () => {
    expect(dryInstant("roller_dry_instant")).toBe(true);
  });
  it("mini pocket compact is also dry instant", () => {
    expect(dryInstant("mini_pocket_compact")).toBe(true);
  });
});

describe("refillable", () => {
  it("refillable eco spool is refillable", () => {
    expect(refillable("refillable_eco_spool")).toBe(true);
  });
  it("roller dry instant is not", () => {
    expect(refillable("roller_dry_instant")).toBe(false);
  });
});

describe("applicatorStyle", () => {
  it("retractable pen style uses retractable tip pen", () => {
    expect(applicatorStyle("retractable_pen_style")).toBe("retractable_tip_pen");
  });
});

describe("bestUse", () => {
  it("mini pocket compact best for pencil case student", () => {
    expect(bestUse("mini_pocket_compact")).toBe("pencil_case_student");
  });
});

describe("correctionTapes", () => {
  it("returns 5 types", () => {
    expect(correctionTapes()).toHaveLength(5);
  });
});

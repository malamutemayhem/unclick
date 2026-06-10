import { describe, it, expect } from "vitest";
import {
  cuttingRate, polishQuality, flatness, lapLife,
  lapCost, needsCharge, preCharged, lapMaterial,
  bestUse, facetLaps,
} from "../facet-lap-calc.js";

describe("cuttingRate", () => {
  it("cast iron charge fastest cutting rate", () => {
    expect(cuttingRate("cast_iron_charge")).toBeGreaterThan(cuttingRate("tin_lead_alloy"));
  });
});

describe("polishQuality", () => {
  it("copper fine polish best polish quality", () => {
    expect(polishQuality("copper_fine_polish")).toBeGreaterThan(polishQuality("cast_iron_charge"));
  });
});

describe("flatness", () => {
  it("ceramic oxide bond best flatness", () => {
    expect(flatness("ceramic_oxide_bond")).toBeGreaterThan(flatness("composite_resin_disc"));
  });
});

describe("lapLife", () => {
  it("ceramic oxide bond longest lap life", () => {
    expect(lapLife("ceramic_oxide_bond")).toBeGreaterThan(lapLife("tin_lead_alloy"));
  });
});

describe("lapCost", () => {
  it("copper fine polish more expensive", () => {
    expect(lapCost("copper_fine_polish")).toBeGreaterThan(lapCost("composite_resin_disc"));
  });
});

describe("needsCharge", () => {
  it("cast iron charge needs charge", () => {
    expect(needsCharge("cast_iron_charge")).toBe(true);
  });
  it("ceramic oxide bond no charge needed", () => {
    expect(needsCharge("ceramic_oxide_bond")).toBe(false);
  });
});

describe("preCharged", () => {
  it("ceramic oxide bond is pre charged", () => {
    expect(preCharged("ceramic_oxide_bond")).toBe(true);
  });
  it("cast iron charge not pre charged", () => {
    expect(preCharged("cast_iron_charge")).toBe(false);
  });
});

describe("lapMaterial", () => {
  it("cast iron charge uses grey cast iron", () => {
    expect(lapMaterial("cast_iron_charge")).toBe("grey_cast_iron");
  });
});

describe("bestUse", () => {
  it("copper fine polish best for final mirror polish", () => {
    expect(bestUse("copper_fine_polish")).toBe("final_mirror_polish");
  });
});

describe("facetLaps", () => {
  it("returns 5 types", () => {
    expect(facetLaps()).toHaveLength(5);
  });
});

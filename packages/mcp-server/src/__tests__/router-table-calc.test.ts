import { describe, it, expect } from "vitest";
import {
  surfaceArea, fenceAccuracy, dustCollection, setupSpeed,
  tableCost, miterSlot, angleCapable, topMaterial,
  bestUse, routerTables,
} from "../router-table-calc.js";

describe("surfaceArea", () => {
  it("cabinet enclosed largest surface area", () => {
    expect(surfaceArea("cabinet_enclosed")).toBeGreaterThan(surfaceArea("portable_fold"));
  });
});

describe("fenceAccuracy", () => {
  it("cabinet enclosed most accurate fence", () => {
    expect(fenceAccuracy("cabinet_enclosed")).toBeGreaterThan(fenceAccuracy("portable_fold"));
  });
});

describe("dustCollection", () => {
  it("cabinet enclosed best dust collection", () => {
    expect(dustCollection("cabinet_enclosed")).toBeGreaterThan(dustCollection("portable_fold"));
  });
});

describe("setupSpeed", () => {
  it("portable fold fastest setup", () => {
    expect(setupSpeed("portable_fold")).toBeGreaterThan(setupSpeed("tilting_angle"));
  });
});

describe("tableCost", () => {
  it("cabinet enclosed most expensive", () => {
    expect(tableCost("cabinet_enclosed")).toBeGreaterThan(tableCost("benchtop_basic"));
  });
});

describe("miterSlot", () => {
  it("benchtop basic has miter slot", () => {
    expect(miterSlot("benchtop_basic")).toBe(true);
  });
  it("portable fold does not", () => {
    expect(miterSlot("portable_fold")).toBe(false);
  });
});

describe("angleCapable", () => {
  it("tilting angle is angle capable", () => {
    expect(angleCapable("tilting_angle")).toBe(true);
  });
  it("cabinet enclosed is not", () => {
    expect(angleCapable("cabinet_enclosed")).toBe(false);
  });
});

describe("topMaterial", () => {
  it("cabinet enclosed uses cast iron machined", () => {
    expect(topMaterial("cabinet_enclosed")).toBe("cast_iron_machined");
  });
});

describe("bestUse", () => {
  it("portable fold for job site trim work", () => {
    expect(bestUse("portable_fold")).toBe("job_site_trim_work");
  });
});

describe("routerTables", () => {
  it("returns 5 types", () => {
    expect(routerTables()).toHaveLength(5);
  });
});

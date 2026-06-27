import { describe, it, expect } from "vitest";
import {
  depthCapability, dataContinuity, parameterRange, fieldSpeed,
  testCost, requiresBorehole, retrievesSample, measurementMethod,
  bestSoilType, soilTests,
} from "../soil-test-calc.js";

describe("depthCapability", () => {
  it("pressuremeter deepest capability", () => {
    expect(depthCapability("pressuremeter")).toBeGreaterThan(depthCapability("plate_load"));
  });
});

describe("dataContinuity", () => {
  it("cpt best data continuity", () => {
    expect(dataContinuity("cpt")).toBeGreaterThan(dataContinuity("spt"));
  });
});

describe("parameterRange", () => {
  it("pressuremeter widest parameter range", () => {
    expect(parameterRange("pressuremeter")).toBeGreaterThan(parameterRange("vane_shear"));
  });
});

describe("fieldSpeed", () => {
  it("cpt fastest in field", () => {
    expect(fieldSpeed("cpt")).toBeGreaterThan(fieldSpeed("plate_load"));
  });
});

describe("testCost", () => {
  it("pressuremeter most expensive", () => {
    expect(testCost("pressuremeter")).toBeGreaterThan(testCost("vane_shear"));
  });
});

describe("requiresBorehole", () => {
  it("spt requires borehole", () => {
    expect(requiresBorehole("spt")).toBe(true);
  });
  it("cpt does not", () => {
    expect(requiresBorehole("cpt")).toBe(false);
  });
});

describe("retrievesSample", () => {
  it("spt retrieves sample", () => {
    expect(retrievesSample("spt")).toBe(true);
  });
  it("cpt does not", () => {
    expect(retrievesSample("cpt")).toBe(false);
  });
});

describe("measurementMethod", () => {
  it("cpt uses cone tip friction sleeve", () => {
    expect(measurementMethod("cpt")).toBe("cone_tip_friction_sleeve");
  });
});

describe("bestSoilType", () => {
  it("vane shear for soft sensitive clay", () => {
    expect(bestSoilType("vane_shear")).toBe("soft_sensitive_clay");
  });
});

describe("soilTests", () => {
  it("returns 5 tests", () => {
    expect(soilTests()).toHaveLength(5);
  });
});
